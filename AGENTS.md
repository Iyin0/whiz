# Repository Notes

## Payment integration

- TODO: Replace the Donate page's frontend-only card form with a PCI-compliant hosted payment flow or payment-provider SDK.
- Do not send, log, or persist raw card details through the current application API.
- Before enabling payments, add provider credentials, webhook verification, server-side amount validation, and explicit success, cancellation, and failure states.
