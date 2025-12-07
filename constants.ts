import { ModuleItem, SDLCPhase } from './types';
import { Shield, Box, Server, Activity, Lock, GitBranch, Layers, Eye } from 'lucide-react';

export const SYSTEM_INSTRUCTION = `
You are a Senior DevSecOps Engineer specializing in Red Hat OpenShift and Container Security. 
Your goal is to educate developers on how to build, deploy, and run secure containers.
Focus on:
1. Red Hat specific tools (UBI images, Quay, ACS/StackRox, OpenShift SCCs).
2. General Container Security best practices (Least Privilege, Image Scanning).
3. Practical examples (YAML snippets, Dockerfile instructions, oc commands).
Format your responses with clear headings, bullet points, and code blocks.
Avoid generic fluff. Be technical and precise.
`;

export const CURRICULUM: ModuleItem[] = [
  {
    id: 'base-images',
    title: 'Minimal Base Images',
    phase: SDLCPhase.DESIGN,
    shortDesc: 'Using specialized images (UBI Micro) to minimize attack surface.',
    promptTopic: 'Explain the security benefits of using specialized, minimal base images (like UBI Micro) over generic UBI Standard images. Discuss how removing the OS package manager and shell reduces the attack surface. Show a multi-stage Dockerfile example using UBI Micro as the final runtime image.'
  },
  {
    id: 'supply-chain',
    title: 'Secure Supply Chain',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Signing images, CI/CD integration, and trusted registries.',
    promptTopic: 'Detail how to secure the container supply chain on OpenShift. Discuss ImageStreams, using Red Hat Quay for vulnerability scanning, and the concept of signing images (sigstore/cosign) within a Tekton pipeline.'
  },
  {
    id: 'build-strategies',
    title: 'Secure Build Strategies',
    phase: SDLCPhase.BUILD,
    shortDesc: 'Multi-stage builds and secret handling during build.',
    promptTopic: 'Explain secure container build strategies. Focus on multi-stage builds to reduce image size and attack surface. Explain how to handle secrets during the build process (and why strictly avoiding secrets in layers is critical).'
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
    id: 'runtime-security',
    title: 'Runtime Detection (ACS)',
    phase: SDLCPhase.RUNTIME,
    shortDesc: 'Detecting anomalies using RHACS (StackRox).',
    promptTopic: 'Discuss runtime security in OpenShift using Red Hat Advanced Cluster Security (RHACS). How does it detect anomalous process execution or cryptomining? Explain the concept of "System Policies" in ACS.'
  },
];

export const ICONS: Record<string, any> = {
  [SDLCPhase.DESIGN]: Shield,
  [SDLCPhase.BUILD]: Box,
  [SDLCPhase.DEPLOY]: Server,
  [SDLCPhase.RUNTIME]: Activity,
};