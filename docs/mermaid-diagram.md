graph TD
  %% Core
  A[CyberEco Hub]:::core

  %% Categories (No commas)
  subgraph Community_Governance
    Demos
    CommunityManager[Community Manager]
    MyCommunity
    Conciliation
    CrowdPool
  end

  subgraph Finance_Economy
    JustSplit
    MyWealth
    MyBusiness
    CrowdFund
    OfferMe
  end

  subgraph Sustainability_Home
    Plantopia
    EcoTul
    MyHome
  end

  subgraph Education_Growth
    EducationHub
    SkillShare
    Habits
    OneStep
  end

  subgraph Health_Wellness
    Healthy
    PetPal
  end

  subgraph Identity_Data_Legal
    LawPal
    MyData
    DigitalMe
    MyDocs
    GovAccess
  end

  subgraph Family_Memory
    Somos
    RememberMe
  end

  subgraph Travel_Local
    TravelMate
    EventConnect
    LocalWonders
    Hobbist
  end

  subgraph Tech_Productivity_Career
    TradePilot
    Nexus
    ProviderConnect
    MyProjects
    MyCareer
    BetterShopping
    HelpMe
    FoodMachine
  end

  %% Hub relationships
  A --> Demos
  A --> CommunityManager
  A --> MyCommunity
  A --> Conciliation
  A --> CrowdPool

  A --> JustSplit
  A --> MyWealth
  A --> MyBusiness
  A --> CrowdFund
  A --> OfferMe

  A --> Plantopia
  A --> EcoTul
  A --> MyHome

  A --> EducationHub
  A --> SkillShare
  A --> Habits
  A --> OneStep

  A --> Healthy
  A --> PetPal

  A --> LawPal
  A --> MyData
  A --> DigitalMe
  A --> MyDocs
  A --> GovAccess

  A --> Somos
  A --> RememberMe

  A --> TravelMate
  A --> EventConnect
  A --> LocalWonders
  A --> Hobbist

  A --> TradePilot
  A --> Nexus
  A --> ProviderConnect
  A --> MyProjects
  A --> MyCareer
  A --> BetterShopping
  A --> HelpMe
  A --> FoodMachine

  %% Sample App relationships
  JustSplit --> MyWealth
  MyWealth --> MyBusiness
  CrowdFund --> Demos
  EcoTul --> BetterShopping
  Healthy --> Habits
  Healthy --> FoodMachine
  MyData --> DigitalMe

  classDef core fill:#004225,stroke:#333,stroke-width:2px,color:#fff
