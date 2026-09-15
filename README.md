RingRelay

RingRelay is a context-aware decision layer for home safety events. Instead of treating every motion alert equally, it combines event type, time, location, repetition, and household preferences to recommend an appropriate next action.

This starter MVP uses a local event simulator so the product flow can be tested without external credentials. It is intentionally structured for a later Ring event adapter and AWS Bedrock explanation layer.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Demo scenarios

- Package detected: schedules a low-priority reminder.
- Unknown visitor at night: shows a high-priority recommendation and asks for confirmation.
- Repeated motion: recommends review and keeps escalation under user control.

## Safety boundaries

RingRelay does not use facial recognition, unlock doors, make automatic police calls, or make final safety decisions without user confirmation. The simulator is not a live Ring integration.

## Roadmap

1. Add a Ring event adapter.
2. Add a small backend for event persistence.
3. Add Amazon Bedrock for concise, explainable event summaries.
4. Add household preference persistence and notification integrations.

## License

MIT
