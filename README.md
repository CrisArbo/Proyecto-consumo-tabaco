<p align="center">
  <img src="./docs/banner.png" alt="banner"/>
</p>

<p align="center">   
  <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white" alt="Zod"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="center">
Prevalencia is a web platform for querying and visualizing information regarding tobacco consumption and the use of electronic cigarettes or nicotine vaporizers in Colombia.
</p>

---

## Entity Relationship Diagram

```mermaid
erDiagram
    HOUSEHOLD ||--|{ PERSON : "has"
    PERSON ||--o| RESPONDENT : "can be"
    RESPONDENT ||--|| TOBACCO_USE : "answers"
    RESPONDENT ||--|| VAPE_USE : "answers"

    CAT_GENDER ||--o{ PERSON : "classifies"
    CAT_ACTIVITY ||--o{ RESPONDENT : "classifies"
    CAT_HEALTH_STATUS ||--o{ RESPONDENT : "classifies"
    CAT_RISK ||--o{ RESPONDENT : "classifies"
    CAT_EDUCATION_LEVEL ||--o{ RESPONDENT : "classifies"
    CAT_ANSWER ||--o{ TOBACCO_USE : "Yes / No / No answer"
    CAT_FIRST_USE_TIMING |o--o{ TOBACCO_USE : "classifies"
    CAT_ANSWER ||--o{ VAPE_USE : "Yes / No / No answer"

    HOUSEHOLD {
        serial id PK
    }
    PERSON {
        serial id PK
        int household_id FK
        smallint person_order
        smallint survey_sequence
        smallint p_sequence
        int gender FK
        smallint age
    }
    RESPONDENT {
        serial id PK
        int person_id FK
        int main_activity FK
        int health_status FK
        int smoking_risk FK
        int education_level FK
    }
    TOBACCO_USE {
        serial id PK
        int respondent_id FK
        int ever_smoked FK
        smallint age_first_use
        int first_use_timing FK
        int smoked_last_12m FK
        int smoked_last_30d FK
    }
    VAPE_USE {
        serial id PK
        int respondent_id FK
        int ever_vaped FK
        smallint age_first_use
        int vaped_last_30d FK
    }
    CAT_GENDER {
        serial id PK
        smallint code
        text label
    }
    CAT_ANSWER {
        serial id PK
        smallint code
        text label
    }
    CAT_ACTIVITY {
        serial id PK
        smallint code
        text label
    }
    CAT_HEALTH_STATUS {
        serial id PK
        smallint code
        text label
    }
    CAT_RISK {
        serial id PK
        smallint code
        text label
    }
    CAT_EDUCATION_LEVEL {
        serial id PK
        smallint code
        text label
    }
    CAT_FIRST_USE_TIMING {
        serial id PK
        smallint code
        text label
    }
```

## Architecture Diagram

<p align="center">
  <img src="./docs/architecture-diagram.png" alt="architecture-diagram">
</p>

---

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

- [IsaCode4](https://github.com/IsaCode4)
