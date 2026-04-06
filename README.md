# Baker Family Hub

A family calendar and hub application built with Next.js, TypeScript, and Tailwind CSS. Designed to run on a local network for family use.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the application:

```bash
npm run build
```

3. Start with pm2:

```bash
pm2 start ecosystem.config.js
```

## Accessing from LAN Devices

Once the app is running, access it from any device on your local network at:

```
http://<VM_IP>:3000
```

Replace `<VM_IP>` with the IP address of the machine running the app (e.g., `http://192.168.1.100:3000`).

## pm2 Boot Persistence

To ensure the app starts automatically on system boot:

```bash
pm2 startup
pm2 save
```

Follow any instructions output by `pm2 startup` (it may ask you to run a command with sudo).

## Checking Logs

View application logs:

```bash
pm2 logs baker-hub
```

## Development

Run the development server:

```bash
npm run dev
```
