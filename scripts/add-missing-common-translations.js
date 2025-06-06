#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Missing keys that should be in common namespace
const missingKeys = {
  contactPage: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    successMessage: "Your message has been sent successfully. We'll get back to you soon!",
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    sendingButton: "Sending...",
    submitButton: "Send Message",
    contactInfoTitle: "Get in Touch",
    emailContactLabel: "Email",
    addressLabel: "Address",
    socialTitle: "Follow Us"
  },
  errorPage: {
    title: "Something went wrong",
    subtitle: "An unexpected error occurred",
    backHome: "Back to Home"
  },
  faqPage: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about the CyberEco platform"
  },
  privacyPage: {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your data"
  },
  supportPage: {
    title: "Support Center",
    subtitle: "Get help with CyberEco applications and services"
  },
  termsPage: {
    title: "Terms of Service",
    subtitle: "Terms and conditions for using CyberEco services"
  },
  visionPage: {
    title: "Our Vision",
    subtitle: "Building a decentralized future for digital communities"
  },
  roadmapPage: {
    title: "Development Roadmap",
    subtitle: "Our journey towards a complete digital ecosystem"
  },
  philosophyPage: {
    title: "Our Philosophy",
    subtitle: "The principles that guide our development"
  },
  statusPage: {
    title: "System Status",
    subtitle: "Current operational status of CyberEco services"
  },
  dataArchitecture: {
    title: "Data Layer Architecture",
    subtitle: "Centralized data management for the CyberEco ecosystem",
    tabs: {
      overview: "Overview",
      architecture: "Architecture",
      dataflow: "Data Flow",
      implementation: "Implementation",
      benefits: "Benefits"
    }
    // Add more as needed...
  },
  hubGateway: {
    title: "Hub Gateway & Proxy",
    subtitle: "Unified entry point for all CyberEco applications",
    tabs: {
      overview: "Overview",
      architecture: "Architecture",
      proxy: "Proxy Configuration",
      deployment: "Deployment"
    }
    // Add more as needed...
  }
};

const missingSpanishKeys = {
  contactPage: {
    title: "Contáctanos",
    subtitle: "Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.",
    successMessage: "Tu mensaje ha sido enviado exitosamente. ¡Te responderemos pronto!",
    nameLabel: "Nombre",
    emailLabel: "Correo Electrónico",
    subjectLabel: "Asunto",
    messageLabel: "Mensaje",
    sendingButton: "Enviando...",
    submitButton: "Enviar Mensaje",
    contactInfoTitle: "Ponte en Contacto",
    emailContactLabel: "Correo Electrónico",
    addressLabel: "Dirección",
    socialTitle: "Síguenos"
  },
  errorPage: {
    title: "Algo salió mal",
    subtitle: "Ocurrió un error inesperado",
    backHome: "Volver al Inicio"
  },
  faqPage: {
    title: "Preguntas Frecuentes",
    subtitle: "Encuentra respuestas a preguntas comunes sobre la plataforma CyberEco"
  },
  privacyPage: {
    title: "Política de Privacidad",
    subtitle: "Cómo recopilamos, usamos y protegemos tus datos"
  },
  supportPage: {
    title: "Centro de Soporte",
    subtitle: "Obtén ayuda con las aplicaciones y servicios de CyberEco"
  },
  termsPage: {
    title: "Términos de Servicio",
    subtitle: "Términos y condiciones para usar los servicios de CyberEco"
  },
  visionPage: {
    title: "Nuestra Visión",
    subtitle: "Construyendo un futuro descentralizado para las comunidades digitales"
  },
  roadmapPage: {
    title: "Hoja de Ruta de Desarrollo",
    subtitle: "Nuestro viaje hacia un ecosistema digital completo"
  },
  philosophyPage: {
    title: "Nuestra Filosofía",
    subtitle: "Los principios que guían nuestro desarrollo"
  },
  statusPage: {
    title: "Estado del Sistema",
    subtitle: "Estado operacional actual de los servicios de CyberEco"
  },
  dataArchitecture: {
    title: "Arquitectura de Capa de Datos",
    subtitle: "Gestión centralizada de datos para el ecosistema CyberEco",
    tabs: {
      overview: "Visión General",
      architecture: "Arquitectura",
      dataflow: "Flujo de Datos",
      implementation: "Implementación",
      benefits: "Beneficios"
    }
  },
  hubGateway: {
    title: "Gateway y Proxy del Hub",
    subtitle: "Punto de entrada unificado para todas las aplicaciones de CyberEco",
    tabs: {
      overview: "Visión General",
      architecture: "Arquitectura",
      proxy: "Configuración del Proxy",
      deployment: "Despliegue"
    }
  }
};

// Load existing translation files
const enCommonPath = path.join(__dirname, '../libs/i18n/src/locales/en/common.json');
const esCommonPath = path.join(__dirname, '../libs/i18n/src/locales/es/common.json');

const enCommon = require(enCommonPath);
const esCommon = require(esCommonPath);

// Deep merge function
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Merge missing keys
const updatedEnCommon = deepMerge(enCommon, missingKeys);
const updatedEsCommon = deepMerge(esCommon, missingSpanishKeys);

// Write updated files
fs.writeFileSync(enCommonPath, JSON.stringify(updatedEnCommon, null, 2) + '\n', 'utf8');
fs.writeFileSync(esCommonPath, JSON.stringify(updatedEsCommon, null, 2) + '\n', 'utf8');

console.log('✅ Added missing translation keys to common namespace');
console.log('   - English: Added keys for', Object.keys(missingKeys).join(', '));
console.log('   - Spanish: Added keys for', Object.keys(missingSpanishKeys).join(', '));