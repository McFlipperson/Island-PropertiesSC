# CaraPH Project Analysis

## Overview  
- **CaraPH/CARAclip** = Complete clinical AI documentation system
- **Patent filed:** June 20, 2025 (Provisional, Roger Brunet)
- **Target market:** Doctors, clinics competing with Nuance DAX, Teladoc
- **Revolutionary approach:** Fully offline, edge-based clinical AI

## CARAclip Device (formerly "Novaball")
- **Complete clinical workflow on-device:**
  - Real-time speech recognition (medical vocabulary)
  - SOAP note generation
  - ICD-10/CPT billing code generation  
  - Electronic prescription drafts (FHIR)
  - Clinical decision support (CDS)
  - X12 837P insurance claims

## Technical Specs
- **Hardware:** ARM Cortex-A55, 1GB RAM, <256MB working memory
- **Processing:** Subquadratic O(n) models vs competitors' O(n²) transformers
- **Performance:** ≤1.5x real-time on 30-min consultations (vs 4.8x for transformers)
- **Models:** 8-bit quantized, 95MB ASR + 18MB NLP + 12MB coder = 125MB total
- **Privacy:** AES-256 encryption, secure element, zero unencrypted PHI leaves device
- **Languages:** English + Cebuano support

## Competitive Advantage
- **Fully offline** (vs cloud-dependent competitors)
- **5x faster** than transformer-based systems
- **Complete workflow** (transcription + coding + billing + prescriptions)
- **Local learning** from human feedback without internet
- **HIPAA compliant** by design (encrypted local storage)

## Market Position
**Direct competitors:**
- Nuance DAX (Microsoft) - cloud transformer + remote scribes
- Teladoc/Philips - server-side SOAP only  
- 3M 360 Encompass - server-side coding only
- Abridge - draft notes only

**CARAclip advantage:** Only system doing complete clinical workflow entirely on edge device

## Business Model
- **Hardware sales:** CARAclip devices ($? per unit)
- **Software licensing:** Per-provider or per-practice subscription
- **Training/support:** Implementation and ongoing training
- **Regulatory compliance:** FDA device registration likely required

## Current Status Questions
- Patent pending, hardware designed, software trained
- Need to know: pilot customers, manufacturing timeline, regulatory pathway