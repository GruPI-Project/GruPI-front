# Componentes - Atomic Design

Esta pasta contém todos os componentes Vue organizados segundo a metodologia **Atomic Design**.

## 📂 Estrutura

```
components/
├── atoms/         # Componentes básicos e indivisíveis
├── molecules/     # Componentes compostos por átomos
└── organisms/     # Componentes complexos específicos do domínio
```

## 🎯 Guia Rápido

### Quando criar um Atom?

Crie um **atom** quando você tem um componente:
- Simples e reutilizável (Button, Input, Icon)
- Sem lógica de negócio
- Que será usado em vários lugares
- Configurável apenas via props

**Exemplos:** Button, Input, Label, Icon, Badge, Avatar

### Quando criar uma Molecule?

Crie uma **molecule** quando você precisa:
- Combinar vários atoms
- Criar um componente de layout/estrutura
- Adicionar lógica de apresentação (UI)
- Componente reutilizável em diferentes contextos

**Exemplos:** FormField, SearchBar, Card, Header, Footer, Modal

### Quando criar um Organism?

Crie um **organism** quando você tem:
- Funcionalidade específica do domínio
- Integração com API ou store
- Lógica de negócio
- Componente complexo que combina atoms e molecules

**Exemplos:** GroupList, GroupForm, UserProfile, Dashboard

## 🔄 Fluxo de Desenvolvimento

1. **Identifique a necessidade**: Que componente você precisa?
2. **Verifique se já existe**: Procure em atoms e molecules primeiro
3. **Escolha o nível adequado**: Atom, Molecule ou Organism?
4. **Crie o componente**: Na pasta correta
5. **Documente**: Adicione comentários e tipos TypeScript

## 📋 Convenções de Nomenclatura

### Atoms
```
Button.vue
Input.vue
Icon.vue
Badge.vue
```

### Molecules
```
FormField.vue
SearchBar.vue
AppHeader.vue
NavBar.vue
```

### Organisms
```
GroupList.vue
GroupForm.vue
UserProfile.vue
LoginForm.vue
```

## 💡 Dicas

- **Atoms** não importam outros componentes (exceto icons/assets)
- **Molecules** importam atoms
- **Organisms** importam atoms e molecules
- **Views** (pages) importam principalmente organisms

## 📖 Leia Mais

- [Atoms README](./atoms/README.md)
- [Molecules README](./molecules/README.md)
- [Organisms README](./organisms/README.md)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

