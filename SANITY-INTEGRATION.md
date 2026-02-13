# Island Properties + Sanity Integration

## What Needs to Happen

1. Island Properties stops using hardcoded mock data
2. Instead, it fetches live properties from Sanity CMS
3. Nov adds/edits properties in Sanity dashboard
4. Website updates automatically (no code changes needed)

---

## Current State (Mock Data)

File: `island-properties/src/components/Properties.jsx`

```jsx
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Beachfront Villa",
    price: 25000000,
    ...
  },
  ...
]

function Properties() {
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  ...
}
```

---

## Target State (Sanity-Powered)

```jsx
import { getAllProperties } from '../lib/sanity';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProperties()
      .then(setProperties)
      .catch(err => console.error('Failed to fetch properties:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading properties...</div>;
  
  return (
    <div className="properties-grid">
      {properties.map(prop => (
        <PropertyCard key={prop._id} property={prop} />
      ))}
    </div>
  );
}
```

---

## Implementation Steps

### Step 1: Install Sanity Client
```bash
cd island-properties
npm install @sanity/client
```

### Step 2: Create Sanity Client Config
Save as: `island-properties/src/lib/sanity.js`

```javascript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-02-11',
  useCdn: true,
})

export const getAllProperties = () => {
  return client.fetch(`
    *[_type == "property" && availability != "sold"] | order(featured desc, publishedAt desc) {
      _id,
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      squareMeters,
      keyFeatures,
      annualYield,
      roi,
      images,
      description,
      availability,
      featured
    }
  `)
}

export const getFeaturedProperties = () => {
  return client.fetch(`
    *[_type == "property" && featured == true] | order(publishedAt desc)[0...3] {
      _id,
      title,
      price,
      location,
      images,
      roi,
      featured
    }
  `)
}
```

### Step 3: Add Environment Variable
Create: `.env.local`
```
REACT_APP_SANITY_PROJECT_ID=YOUR_PROJECT_ID_HERE
```

Nov will provide the Project ID from his Sanity setup.

### Step 4: Update Properties Component
Replace hardcoded MOCK_PROPERTIES with:

```jsx
import { getAllProperties } from '../lib/sanity';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProperties()
      .then(setProperties)
      .catch(err => {
        setError(err.message);
        console.error('Sanity fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) return <div className="error">Failed to load properties. {error}</div>;
  if (loading) return <div className="loading">Loading properties...</div>;

  return (
    <div className="properties-container">
      <h2>Featured Properties</h2>
      <div className="properties-grid">
        {properties.map(prop => (
          <PropertyCard key={prop._id} property={prop} />
        ))}
      </div>
    </div>
  );
}
```

### Step 5: Update PropertyCard Component
Make sure PropertyCard accepts all fields from Sanity:

```jsx
function PropertyCard({ property }) {
  const mainImage = property.images?.[0]?.url || '/placeholder.jpg';
  
  return (
    <div className="property-card">
      <img src={mainImage} alt={property.images?.[0]?.alt || property.title} />
      <h3>{property.title}</h3>
      <p className="location">{property.location}</p>
      <p className="price">₱{property.price?.toLocaleString()}</p>
      <p className="roi">Annual Yield: {property.annualYield}% (₱{property.roi?.toLocaleString()}/yr)</p>
      <ul className="features">
        {property.keyFeatures?.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <span className={`badge ${property.availability}`}>
        {property.availability === 'coming-soon' ? 'Coming Soon' : property.availability.toUpperCase()}
      </span>
    </div>
  );
}
```

### Step 6: Test Locally
```bash
npm run dev
```
Should see "Loading properties..." then properties from Sanity.

### Step 7: Deploy
```bash
git add .
git commit -m "feat: integrate Sanity CMS for dynamic properties"
git push
```

Then Nov re-deploys on Vercel (automatic if GitHub Actions configured).

---

## Rollback Plan

If Sanity integration breaks:
1. Revert the Properties.jsx and sanity.js changes
2. Fall back to MOCK_PROPERTIES
3. Git push to redeploy

No data is lost; mock data is still in the codebase.

---

## Timeline for Full Integration

| Step | Owner | Time | Status |
|------|-------|------|--------|
| 1. Install package | Nov | 1 min | Pending Nov |
| 2-3. Create Sanity client | SC (autonomous) | 5 min | Ready |
| 4-5. Update components | SC (autonomous) | 10 min | Ready |
| 6. Test locally | Nov | 5 min | Pending Nov |
| 7. Deploy to Vercel | Nov | 5 min | Pending Nov |

**Total: ~30 minutes once Nov has Sanity Project ID**

