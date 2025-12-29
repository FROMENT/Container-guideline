import { ModuleItem, SDLCPhase } from './types.ts';

export const SYSTEM_INSTRUCTION = `
You are a Senior DevSecOps Engineer specializing in Red Hat OpenShift and Container Security. 
Your goal is to educate developers on how to build, deploy, and run secure containers.
Focus on:
1. Red Hat specific tools (UBI images, Quay, ACS/StackRox, OpenShift SCCs).
2. General Container Security best practices (Least Privilege, Image Scanning).
3. Secure Architecture (3-Tier patterns, DBaaS usage, Cloud Capacity & Scalability).
4. Practical examples (YAML snippets, Dockerfile instructions, oc commands).
Format your responses with clear headings, bullet points, and code blocks.
Avoid generic fluff. Be technical and precise.
`;

export const GLOSSARY: Record<string, string> = {
  'UBI': 'Universal Base Image: Red Hat\'s secure, OCI-compliant base image derived from RHEL packages. UBI Micro is a minimized version without a package manager.',
  'SCC': 'Security Context Constraints: OpenShift objects that control permissions for Pods, similar to PSPs but more granular. They define what actions a pod can perform (e.g., run as root, access host network).',
  'COSIGN': 'A tool part of the Sigstore project used for container image signing and verification, ensuring software supply chain integrity.',
  'TEKTON': 'A powerful, flexible, Kubernetes-native open-source framework for creating CI/CD systems, known in OpenShift as OpenShift Pipelines.',
  'DBAAS': 'Database-as-a-Service: Using managed database services (like RDS or Crunchy Data on OpenShift) instead of self-managing stateful database containers, improving security and operational overhead.',
  'ACS': 'Red Hat Advanced Cluster Security for Kubernetes (formerly StackRox): A Kubernetes-native security platform that enforces policies and scans for vulnerabilities across the lifecycle.',
  'QUAY': 'Red Hat Quay: A distributed and highly available container image registry with built-in vulnerability scanning (Clair).',
  'ROX': 'The command-line interface (CLI) for Red Hat Advanced Cluster Security (ACS).',
  'PVC': 'Persistent Volume Claim: A request for storage by a user, which is bound to a Persistent Volume (PV) in OpenShift.',
  'NETWORKPOLICY': 'A Kubernetes specification that defines how groups of pods are allowed to communicate with each other and other network endpoints.',
  'TRIVY': 'A comprehensive and versatile security scanner for containers, filesystems, and git repositories.',
  'CLAIR': 'An open-source project for the static analysis of vulnerabilities in application containers (currently used by Quay).'
};

export const CURRICULUM: ModuleItem[] = [
  {
    id: 'base-images',
    title: 'Minimal Base Images',
    phase: SDLCPhase.DESIGN,
    shortDesc: 'Using specialized images (UBI Micro) to minimize attack surface.',
    promptTopic: 'Explain the security benefits of using specialized, minimal base images (like UBI Micro) over generic UBI Standard images. Discuss how removing the OS package manager and shell reduces the attack surface. Detail common container image vulnerabilities (like CVEs in outdated packages) and how they are discovered using tools like Trivy or Clair. Show a multi-stage Dockerfile example using UBI Micro as the final runtime image.'
  },
  {
    id: 'secure-architecture',
    title: 'Secure Architecture & Testing',
    phase: SDLCPhase.DESIGN,
    shortDesc: '3-Tier design, DBaaS, and functional testing strategies.',
    promptTopic: 'Explain the design of a secure 3-tier application on OpenShift (Presentation, Application, Data), specifically focusing on using managed DBaaS for the data layer versus containers. Discuss "Design Security" principles and how to integrate functional testing early to validate cloud capacity and scalability awareness. Provide a conceptual example of how these tiers communicate securely, including sample YAML snippets for Service definitions and NetworkPolicies to enforce tier separation.'
  },
  {
    id: 'supply-chain',
    title: 'Secure Supply Chain',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Signing images, CI/CD integration, and trusted registries.',
    promptTopic: 'Detail how to secure the container supply chain on OpenShift. Discuss ImageStreams, using Red Hat Quay for vulnerability scanning, and the concept of signing images (sigstore/cosign) within a Tekton pipeline. Provide a practical example of a Tekton Task definition that uses `cosign` to sign an image, including the exact `cosign sign` command.'
  },
  {
    id: 'build-strategies',
    title: 'Secure Build Strategies',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Multi-stage builds and secret handling during build.',
    promptTopic: 'Explain secure container build strategies. Focus on multi-stage builds to reduce image size and attack surface. Explain how to handle secrets during the build process (and why strictly avoiding secrets in layers is critical).'
  },
  {
    id: 'cicd-security',
    title: 'Git & CI/CD Security',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Git hooks, signed commits, and secure pipeline runners.',
    promptTopic: 'Explain secure practices within the Git workflow and CI/CD pipelines. Cover "Pre-Commit" checks (using hooks to scan for secrets before commit), enforcing "Signed Commits" (GPG/SSH) to prevent spoofing, and "Push Protection" via branch policies. Also cover build-time security scanning (ACS/Quay) and secure credential management for pipeline runners (Tekton).'
  },
  {
    id: 'deployment-config',
    title: 'Security Context & SCCs',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Managing permissions with Security Context Constraints.',
    promptTopic: 'Explain OpenShift Security Context Constraints (SCCs). How do they differ from standard K8s PSP/PSA? Provide a Deployment YAML example setting `runAsNonRoot: true`, `readOnlyRootFilesystem: true`, and dropping capabilities.'
  },
  {
    id: 'secrets-management',
    title: 'Secrets Management',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Best practices for handling secrets, ConfigMaps, and external vaults.',
    promptTopic: 'Explain best practices for secrets management in OpenShift. Discuss the difference between ConfigMaps and Secrets, why encryption at rest (etcd) is important, and how to use the Secrets Store CSI Driver or External Secrets Operator to integrate with vaults like HashiCorp Vault. Provide a YAML example of mounting a Secret as a volume vs environment variable.'
  },
  {
    id: 'network-policies',
    title: 'Network Isolation',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Microsegmentation using NetworkPolicies.',
    promptTopic: 'Explain how to use NetworkPolicies in OpenShift to isolate namespaces and pods. Provide a YAML example of a "Deny All" policy and an "Allow Specific Ingress" policy.'
  },
  {
    id: 'windows-containers',
    title: 'Windows Containers',
    phase: SDLCPhase.DEPLOY,
    shortDesc: 'Security considerations for Windows workloads.',
    promptTopic: 'Explain the security architecture for Windows Containers on OpenShift. Discuss the Windows Machine Config Operator (WMCO), patching strategies for Windows nodes, and isolation/compatibility differences compared to Linux containers.'
  },
  {
    id: 'ibm-secure-z',
    title: 'IBM Secure & Z',
    phase: SDLCPhase.RUNTIME,
    shortDesc: 'Confidential Computing and IBM Security.',
    promptTopic: 'Explain IBM Secure Execution for Linux on IBM Z and LinuxONE in the context of OpenShift. Discuss how Confidential Computing protects data in use and how IBM Security tools integrate with OpenShift for runtime protection.'
  }
];
