# Assignment Submission Flowchart

```mermaid
flowchart TD
    A[Read assignment requirements] --> B[Open project in VS Code]
    B --> C[Install dependencies with npm install]
    C --> D[Run locally with npm start]
    D --> E{Do / and /api/tasks work?}
    E -- No --> F[Read terminal error and fix it]
    F --> D
    E -- Yes --> G[Create GitHub repository]
    G --> H[Commit and push project]
    H --> I[Connect repository to Render Web Service]
    I --> J[Build and deploy]
    J --> K{Does deployed URL work?}
    K -- No --> L[Check Render deploy logs and fix code]
    L --> H
    K -- Yes --> M[Copy exact Render URL]
    M --> N[Check documentation and README]
    N --> O[Compress project folder into ZIP]
    O --> P[Submit ZIP plus deployed URL]
```

## Deliverables

1. **ZIP file:** source code and documentation.
2. **Deployed URL:** exact public Render URL; test `/` and `/api/tasks` before submission.
3. **GitHub repository:** useful for version control and deploy source, but submit its link only if the instructor asks for it.
