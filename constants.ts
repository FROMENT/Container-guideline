import { ModuleItem, SDLCPhase } from './types.ts';

// --- WETANDSEA ECOSYSTEM & LINKS ---

export const PROJECT_ECOSYSTEM = [
  { 
    name: 'Wicked', 
    url: 'https://wicked.wetandseaai.fr', 
    desc: 'Offensive Security & Red Teaming AI',
    iconName: 'Sword'
  },
  { 
    name: 'Sentinel', 
    url: 'https://sentinel.wetandseaai.fr', 
    desc: 'Blue Team Defense & Threat Hunting',
    iconName: 'Shield' 
  },
  { 
    name: 'Navig-AI-tor', 
    url: 'https://navigaitor.wetandseaai.fr', 
    desc: 'GRC & Compliance Automation',
    iconName: 'Compass'
  },
  { 
    name: 'OpenShift Secure', 
    url: 'https://openshift.wetandseaai.fr', 
    desc: 'Secure SDLC & Container Engineering',
    iconName: 'Container',
    current: true
  }
];

export const EXTERNAL_LINKS = {
  ETSY: 'https://www.etsy.com/shop/WetAndSeaAI',
  KOFI: 'https://ko-fi.com/wetandseaai',
  GITHUB: 'https://github.com/wetandseaai',
  DOCS: 'https://docs.wetandseaai.fr'
};

// --- AI SYSTEM INSTRUCTIONS ---

export const SYSTEM_INSTRUCTION = `
You are a Senior DevSecOps Engineer specializing in Red Hat OpenShift and Container Security. 
Your goal is to educate developers on how to build, deploy, and run secure containers.

CRITICAL INSTRUCTIONS:
1. FOCUS: Red Hat specific tools (UBI images, Quay, ACS/StackRox, OpenShift SCCs).
2. ACCURACY: Do NOT generate or cite specific URLs to academic papers, technical reports (e.g., eecs.berkeley.edu), or outdated PDFs. These are frequently incorrect.
3. SOURCES: ONLY reference official, active documentation from docs.openshift.com, access.redhat.com, or kubernetes.io.
4. BEST PRACTICES: Focus on Least Privilege, Image Scanning, Secure Supply Chain.
5. EXAMPLES: Provide practical YAML snippets, Dockerfile instructions, and 'oc' commands.

Format your responses with clear headings, bullet points, and code blocks. Avoid generic fluff. Be technical and precise.
`;

export const GLOSSARY: Record<string, string> = {
  'UBI': 'Universal Base Image: Red Hat\'s secure, OCI-compliant base image derived from RHEL packages. UBI Micro is a minimized version without a package manager.',
  'SCC': 'Security Context Constraints: OpenShift objects that control permissions for Pods, similar to PSPs but more granular. They define what actions a pod can perform (e.g., run as root, access host network).',
  'COSIGN': 'A tool part of the Sigstore project used for container image signing and verification, ensuring software supply chain integrity.',
  'TEKTON': 'A powerful, flexible, Kubernetes-native open-source framework for creating CI/CD systems, known in OpenShift as OpenShift Pipelines.',
  'DBAAS': 'Database-as-a-Service: Using managed database services (like RDS or Crunchy Data on OpenShift) instead of self-managing stateful database containers.',
  'ACS': 'Red Hat Advanced Cluster Security (formerly StackRox): A Kubernetes-native security platform that enforces policies and scans for vulnerabilities across the lifecycle.',
  'QUAY': 'Red Hat Quay: A distributed container registry with built-in vulnerability scanning (Clair).',
  'ROX': 'The CLI for Red Hat Advanced Cluster Security (ACS).',
  'PVC': 'Persistent Volume Claim: A request for storage by a user, bound to a Persistent Volume (PV) in OpenShift.',
  'NETWORKPOLICY': 'A K8s spec defining how groups of pods communicate with each other and other network endpoints.',
  'TRIVY': 'A versatile security scanner for containers, filesystems, and git repositories.',
  'CLAIR': 'Static analysis tool for container vulnerabilities used by Quay.',
  'ISTIO': 'A service mesh that provides traffic management, security, and observability (used in OpenShift Service Mesh).',
  'RBAC': 'Role-Based Access Control: A method of regulating access to computer or network resources based on the roles of individual users within an enterprise.'
};

export const CURRICULUM: ModuleItem[] = [
  {
    id: 'base-images',
    title: 'Minimal Base Images',
    phase: SDLCPhase.DESIGN,
    shortDesc: 'Using specialized images (UBI Micro) to minimize attack surface.',
    promptTopic: 'Explain the security benefits of using specialized, minimal base images (like UBI Micro) over generic UBI Standard images. Detail how removing the OS package manager and shell reduces the attack surface. Provide a multi-stage Dockerfile example using UBI Micro.'
  },
  {
    id: 'secure-architecture',
    title: 'Secure Architecture & Testing',
    phase: SDLCPhase.DESIGN,
    shortDesc: '3-Tier design, DBaaS, and functional testing strategies.',
    promptTopic: 'Explain the design of a secure 3-tier application on OpenShift. Focus on using managed DBaaS versus containers for data. Include sample YAML for Service definitions and NetworkPolicies.'
  },
  {
    id: 'supply-chain',
    title: 'Secure Supply Chain',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Signing images, CI/CD integration, and trusted registries.',
    promptTopic: 'Detail how to secure the container supply chain on OpenShift using ImageStreams, Quay scanning, and image signing (sigstore/cosign) in a Tekton pipeline.'
  },
  {
    id: 'build-strategies',
    title: 'Secure Build Strategies',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Multi-stage builds and secret handling during build.',
    promptTopic: 'Explain secure multi-stage builds and how to handle secrets safely during the build process without leaking them in image layers.'
  },
  {
    id: 'cicd-security',
    title: 'Git & CI/CD Security',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Git hooks, signed commits, and secure pipeline runners.',
    promptTopic: 'Explain secure practices within the Git workflow and CI/CD pipelines: pre-commit hooks, signed commits, and push protection.'
  },
  {
    id: 'deployment-config',
    title: 'Security Context & SCCs',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Managing permissions with Security Context Constraints.',
    promptTopic: 'Explain OpenShift Security Context Constraints (SCCs). Provide a Deployment YAML example setting runAsNonRoot: true and dropping capabilities.'
  },
  {
    id: 'secrets-management',
    title: 'Secrets Management',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Best practices for handling secrets and external vaults.',
    promptTopic: 'Explain best practices for secrets in OpenShift, including the Secrets Store CSI Driver and External Secrets Operator.'
  },
  {
    id: 'network-policies',
    title: 'Network Isolation',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Microsegmentation using NetworkPolicies.',
    promptTopic: 'Explain how to use NetworkPolicies for namespace isolation. Provide a "Deny All" policy example.'
  },
  {
    id: 'windows-containers',
    title: 'Windows Containers',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Security considerations for Windows workloads.',
    promptTopic: 'Explain the security architecture for Windows Containers on OpenShift and the role of the Windows Machine Config Operator (WMCO).'
  },
  {
    id: 'ibm-secure-z',
    title: 'IBM Secure & Z',
    phase: SDLCPhase.RUNTIME,
    shortDesc: 'Confidential Computing and IBM Security.',
    promptTopic: 'Explain IBM Secure Execution for Linux on IBM Z and LinuxONE in OpenShift. Discuss Confidential Computing concepts.'
  }
];