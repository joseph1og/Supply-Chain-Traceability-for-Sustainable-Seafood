# Sustainable Seafood Traceability System

A blockchain-based solution for tracking sustainable seafood from catch to consumer using Clarity smart contracts on the Stacks blockchain.

## Overview

This system provides end-to-end traceability for seafood products, ensuring transparency and verification of sustainability claims. By recording each step of the supply chain on the blockchain, it creates an immutable record that can be verified by consumers, regulators, and other stakeholders.

## Components

### Vessel Registration Contract
Records details of fishing vessels and their operations:
- Vessel registration with owner information
- Status tracking (active/inactive)
- Ownership transfer capabilities

### Catch Documentation Contract
Tracks species, quantities, and locations of catches:
- Links catches to registered vessels
- Records catch details (species, quantity, location)
- Verification by authorized certifiers

### Processing Verification Contract
Monitors chain of custody to consumer:
- Tracks processing events
- Records destination information
- Provides complete traceability from processed product to original catch

### Certification Contract
Verifies compliance with sustainability standards:
- Management of authorized certifiers
- Issuance of certifications for vessels, catches, and processing events
- Validation of certification status

## Getting Started

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet) - Clarity development environment
- [Node.js](https://nodejs.org/) - For running tests

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-organization/sustainable-seafood-traceability.git
cd sustainable-seafood-traceability

