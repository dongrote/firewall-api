# firewall-api
A minimal API server to remotely control iptables/ebtables.

### Outline
Implement the smallest amount of code possible to enable a client to perform basic firewall functions:
- block inbound MAC addresses
- send out an WoL packet on demand

# REST API

## Firewall

#### Block IP Address
POST /api/inet4?hostname={string}&action=block

#### Unblock IP Address
POST /api/inet4?hostname={string}&action=unblock

#### Query Blocked Devices
GET /api/inet4/blocked

## Wake On Lan

#### Send Wake On Lan Magic Packet
GET /api/ethernet/wol?hwaddr={string}[&password={password}]

#### Query Power-On Status
GET /api/ethernet/awake?hwaddr={string}
