# **Todo With Chatbot**

# **Hackathon** : Hackathon II  
  **Phase** : Phase V — Advanced Cloud Deployment & Event-Driven AI Todo  
# **BY** : GIAIC - MERCHANTSONS - 00037391  

---

A production-grade, cloud-native, event-driven Todo platform built with **Spec-Driven Development (SDD)**. Delivers advanced task intelligence (recurring tasks, reminders, tags, priorities), event-driven architecture (Kafka/Dapr), Kubernetes deployment (Minikube + cloud), and a mobile-first UI with AI chatbot for natural language task management.

## 📋 **Table of Contents**

- [Project Overview](#project-overview)
- [Phase V: Advanced Cloud & Event-Driven](#phase-v-advanced-cloud--event-driven)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Usage](#usage)
- [Architecture](#architecture)
- [Testing](#testing)
- [Browser Support](#browser-support)

## 🎯 **Project Overview**

This project implements the **Evolution of Todo** through all five Hackathon II phases. **Phase V** delivers a production-grade, cloud-native, event-driven AI Todo platform:

- **Complete CRUD + Advanced Metadata**: Tasks with priority, tags, due dates, recurring rules, and reminders
- **Event-Driven Architecture**: Kafka topics (task-events, reminders, task-updates) via Dapr Pub/Sub; async consumers for recurrence and notifications
- **Kubernetes Deployment**: Local (Minikube) and cloud (DOKS/GKE/AKS) with Helm, HPA, and optional Dapr sidecar
- **CI/CD**: GitHub Actions pipeline for spec validation, build, and Helm smoke tests
- **Reusable Intelligence**: MCP tools and chatbot commands shared across REST and chat; documented in specs
- **Mobile-First Responsive UI**: Breakpoints for mobile, tablet, desktop; no horizontal scroll; touch-friendly controls
- **AI Chatbot**: Natural language task management with full support for filters, tags, and reminders
- **User Authentication & Neon DB**: Better Auth + JWT; Neon PostgreSQL for persistence

## ✨ **Features**

### **Core Features**
- ✅ **Create Todos**: Add tasks with title, description, priority, due date, tags, recurrence (daily/weekly/monthly), and reminder
- ✅ **View Todos**: Display all tasks in a responsive layout (single column on mobile, 2-column on desktop)
- ✅ **Update Todos**: Edit existing tasks with a modal popup; all metadata supported
- ✅ **Delete Todos**: Remove tasks with confirmation dialog
- ✅ **Complete Todos**: Toggle task completion status; recurring tasks emit lifecycle events for next occurrence
- ✅ **Priority Levels**: Low, Medium, High with color-coded badges
- ✅ **Due Dates & Reminders**: Due dates with overdue indicators; configurable reminder (minutes before due); browser notifications
- ✅ **Tags**: User-defined labels; filter by tag in UI and API
- ✅ **Recurring Tasks**: Daily, weekly, or monthly recurrence; next occurrence created asynchronously on completion

### **Organization Features**
- ✅ **Filtering**: Filter by status, priority, tag, and due date (Today, This Week, Overdue, All)
- ✅ **Sorting**: Sort by due date, priority, creation date, or title (ascending/descending)
- ✅ **Search**: Real-time search by title or description (case-insensitive)

### **Chatbot Features**
- ✅ **Natural Language Commands**: Full support for create, list, complete, delete, update with priority, tags, due date, and reminder
- ✅ **Create Todos**: "Create a todo called [title]" or "Add a high priority todo [title] due tomorrow"
- ✅ **View Todos**: "Show my todos", "What's pending?", filter by tag or status
- ✅ **Complete / Delete / Update**: "Complete the todo [title]", "Delete [title]", "Change task 1 to …"
- ✅ **Task Queries**: "How many todos do I have", "Count my todos"
- ✅ **Reusable Intelligence**: Same MCP tools and intents used across REST API and chatbot (see `specs/phase-v/reusable-intelligence.md`)

### **UI/UX Features (Phase V – Mobile-First)**
- ✅ **Responsive Design**: Mobile (≤640px), tablet (641–1024px), desktop (≥1025px), large (≥1440px); no horizontal scrolling
- ✅ **Touch-Friendly**: Minimum tap targets on mobile; adaptive filters and sort
- ✅ **Toast Notifications**: User feedback for actions
- ✅ **Confirmation Dialogs**: For delete and important actions
- ✅ **Password Strength Indicator**: During signup
- ✅ **Modern Gradient Theme**: Dark green gradient; clear loading and error states
- ✅ **Reminder Notifications**: Browser notifications for due/reminder times (ReminderChecker)

## 🚀 **Phase V: Advanced Cloud & Event-Driven**

### **Overview**

Phase V extends the Todo AI Chatbot with **advanced task features** (recurring tasks, reminders, tags, priorities), **event-driven architecture** (Kafka topics via Dapr Pub/Sub), **Kubernetes deployment** (Minikube + cloud with Helm), and **CI/CD** (GitHub Actions). All artifacts are traceable to Spec-Kit specifications (`specs/phase-v/`, `specs/deployment/`, etc.).

### **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Minikube Cluster                         │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Frontend Pod    │         │  Backend Pod     │         │
│  │  (React/Vite)    │────────▶│  (FastAPI)       │         │
│  │  Port: 3000      │         │  Port: 8000      │         │
│  │                  │         │  + MCP Tools      │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                            │                    │
│  ┌────────▼─────────┐         ┌────────▼─────────┐         │
│  │ Frontend Service │         │ Backend Service  │         │
│  │ (NodePort)       │         │ (ClusterIP)      │         │
│  └──────────────────┘         └──────────────────┘         │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   ConfigMaps     │         │    Secrets       │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ (External)
                              ▼
                    ┌──────────────────┐
                    │  Neon PostgreSQL  │
                    │   (External DB)   │
                    └──────────────────┘
```

### **Key Features**

- ✅ **Advanced Task Model**: Priority, tags, due date, recurrence (daily/weekly/monthly), reminder (minutes before due)
- ✅ **Event-Driven**: Task lifecycle events (task-events), reminders, task-updates; Dapr Pub/Sub (no direct Kafka in app code)
- ✅ **Docker & Helm**: Multi-stage builds; Helm charts for frontend and backend with env-specific values (`values-minikube.yaml`, `values-cloud.yaml`)
- ✅ **Minikube + Cloud**: Local Minikube and production-grade Kubernetes (DOKS/GKE/AKS); HPA and optional Dapr sidecar
- ✅ **CI/CD**: GitHub Actions pipeline — spec validation, frontend/backend build, image build, Helm lint/template
- ✅ **AIOps**: kubectl-ai and kagent for intelligent Kubernetes operations
- ✅ **Observability**: Health and metrics endpoints; structured logging; probes for autoscaling

### **Prerequisites**

- **Minikube** installed and configured
- **Helm 3.x** installed
- **kubectl** configured for Minikube
- **Docker** for building images
- **Environment Variables**:
  - `DATABASE_URL`: Neon PostgreSQL connection string
  - `BETTER_AUTH_SECRET`: Authentication secret
  - `OPENAI_API_KEY`: OpenAI API key (optional)
  - `JWT_SECRET_KEY`: JWT signing key (optional)

### **Quick Start**

#### **One-Command Deployment (Linux/macOS)**

```bash
# Set environment variables
export DATABASE_URL="postgresql://..."
export BETTER_AUTH_SECRET="your-secret"
export OPENAI_API_KEY="your-key"  # Optional
export JWT_SECRET_KEY="your-key"  # Optional

# Run deployment script
chmod +x scripts/deploy-minikube.sh
./scripts/deploy-minikube.sh
```

#### **One-Command Deployment (Windows PowerShell)**

```powershell
# Set environment variables
$env:DATABASE_URL = "postgresql://..."
$env:BETTER_AUTH_SECRET = "your-secret"
$env:OPENAI_API_KEY = "your-key"  # Optional
$env:JWT_SECRET_KEY = "your-key"  # Optional

# Run deployment script
.\scripts\deploy-minikube.ps1
```

#### **Manual Deployment**

1. **Start Minikube**
   ```bash
   minikube start --profile=todo-hackathon --cpus=4 --memory=8192
   eval $(minikube docker-env --profile=todo-hackathon)
   ```

2. **Build Docker Images**
   ```bash
   docker build -t todo-frontend:latest -f frontend/Dockerfile frontend/
   docker build -t todo-backend:latest -f backend/Dockerfile backend/
   ```

3. **Install Helm Charts** (Phase V: use `values-minikube.yaml` for local, `values-cloud.yaml` for DOKS/GKE/AKS)
   ```bash
   # Backend (Minikube: default or -f helm/todo-backend/values-minikube.yaml)
   helm install todo-backend ./helm/todo-backend \
     -f helm/todo-backend/values-minikube.yaml \
     --set secrets.databaseUrl="${DATABASE_URL}" \
     --set secrets.betterAuthSecret="${BETTER_AUTH_SECRET}" \
     --set secrets.openaiApiKey="${OPENAI_API_KEY}" \
     --set secrets.jwtSecretKey="${JWT_SECRET_KEY}"

   # Frontend
   helm install todo-frontend ./helm/todo-frontend \
     --set config.backendApiUrl="http://todo-backend:8000"
   ```

4. **Access Application**
   ```bash
   # Get NodePort
   NODE_IP=$(minikube ip --profile=todo-hackathon)
   NODE_PORT=$(kubectl get svc todo-frontend -o jsonpath='{.spec.ports[0].nodePort}')
   echo "Frontend URL: http://${NODE_IP}:${NODE_PORT}"
   ```

### **AIOps with kubectl-ai and kagent**

#### **kubectl-ai Examples**

```bash
# Deploy backend with natural language
kubectl-ai "deploy the todo backend with 2 replicas, using image todo-backend:latest, with 512Mi memory limit"

# Scale deployment
kubectl-ai "scale the todo-backend deployment to 5 replicas"

# Diagnose issues
kubectl-ai "why are the todo-backend pods restarting?"

# Troubleshoot connectivity
kubectl-ai "why can't the frontend connect to the backend service?"
```

#### **kagent Examples**

```bash
# Analyze cluster health
kagent analyze cluster --namespace default

# Analyze component health
kagent analyze component todo-backend

# Diagnose pod issues
kagent diagnose --pod todo-backend-*

# Get optimization recommendations
kagent optimize resources --deployment todo-backend

# Analyze why pods restarted
kagent analyze why backend pods restarted
```

### **Verification**

```bash
# Check pod status
kubectl get pods -l 'app in (todo-frontend,todo-backend)'

# Check services
kubectl get svc

# Check logs
kubectl logs -l app=todo-backend --tail=50

# Test health endpoint
kubectl exec -it $(kubectl get pod -l app=todo-backend -o jsonpath='{.items[0].metadata.name}') -- \
  curl http://localhost:8000/api/health
```

### **Scaling**

```bash
# Scale backend replicas
helm upgrade todo-backend ./helm/todo-backend --set replicaCount=5

# Or use kubectl-ai
kubectl-ai "scale todo-backend to 5 replicas for increased load"
```

### **Cleanup**

```bash
# Uninstall Helm charts
helm uninstall todo-frontend todo-backend

# Stop Minikube
minikube stop --profile=todo-hackathon

# Delete Minikube cluster
minikube delete --profile=todo-hackathon
```

### **Spec-Driven Development**

Phase V artifacts are traceable to specifications:

- **Phase V (authoritative)**: `specs/phase-v/phase-v-spec.md`
- **Event consumers**: `specs/phase-v/event-consumers.md`
- **Reusable intelligence**: `specs/phase-v/reusable-intelligence.md`
- **Architecture**: `specs/architecture/kubernetes-overview.md`
- **Containerization**: `specs/deployment/containerization.md`
- **Helm Charts**: `specs/deployment/helm-chart.md`
- **Minikube**: `specs/deployment/minikube.md`
- **AIOps**: `specs/aiops/ai-operations.md`
- **Chatbot commands**: `specs/frontend/chatbot-commands.md`

See `.spec-kit/config.yaml` for the full specification mapping.

### **Phase V Deliverables Summary**

- ✅ Advanced features (recurring, reminders, tags, priority) via UI, API, and chatbot
- ✅ Event-driven services (task-events, reminders) with Dapr when configured
- ✅ Horizontal scaling (HPA); stateless backend; external Neon DB
- ✅ Local (Minikube) and cloud deployment with environment-specific Helm values
- ✅ CI/CD pipeline (`.github/workflows/phase-v-pipeline.yml`)
- ✅ System can be regenerated from specs alone

## 🛠 **Technology Stack**

### **Frontend**
- **React 18+** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS Modules** - Component-scoped styling
- **React Context API + useReducer** - State management
- **Axios** - HTTP client for API calls
- **Better Auth** - Authentication library

### **Backend**
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **PostgreSQL (Neon)** - Cloud-native database
- **JWT (python-jose)** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **python-dotenv** - Environment variable management

### **Server (Optional)**
- **Node.js + Express** - Chat API server
- **MCP SDK** - Model Context Protocol server
- **TypeScript** - Type-safe server development

### **Phase V: Kubernetes, Event-Driven & DevOps**
- **Docker** - Containerization (multi-stage builds)
- **Kubernetes** - Minikube (local) and managed cloud (DOKS/GKE/AKS)
- **Helm** - Charts with `values-minikube.yaml` and `values-cloud.yaml`; HPA
- **Dapr** - Pub/Sub (Kafka abstraction), State, Bindings, Secrets, Service Invocation (when enabled)
- **Kafka / Redpanda** - Event topics (task-events, reminders, task-updates) via Dapr
- **GitHub Actions** - CI/CD: spec validation, build, Helm lint/template
- **kubectl-ai / kagent** - AIOps for Kubernetes operations

## 📁 **Project Structure**

- **frontend** – React/Vite, ChatKit, mobile-first UI, ReminderChecker
- **backend** – FastAPI, SQLModel, optional Dapr publish for task-events
- **server** – Node.js chat API + MCP server (reusable tools)
- **specs** – Spec-Kit specs including Phase V (phase-v-spec, event-consumers, reusable-intelligence)

```
Hackathon-2-Phase5/
├── .specify/              # Spec-driven development artifacts
│   ├── memory/constitution.md
│   ├── spec.md
│   ├── plan.md
│   ├── data-model.md
│   └── tasks.md
├── .github/workflows/     # Phase V CI/CD
│   └── phase-v-pipeline.yml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Chatbot/
│   │   │   ├── FilterBar/
│   │   │   ├── ReminderChecker/   # Due/reminder notifications
│   │   │   ├── SearchBar/
│   │   │   ├── TodoForm/
│   │   │   ├── TodoItem/
│   │   │   └── TodoList/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/         # chatParser, filters
│   │   └── ...
├── backend/
│   ├── app/models/        # Task (tags, recurrence_rule, reminder_minutes_before, etc.)
│   ├── app/routes/        # tasks, health (metrics), auth
│   └── ...
├── server/                # MCP server + chat API
├── helm/
│   ├── todo-frontend/
│   └── todo-backend/      # values.yaml, values-minikube.yaml, values-cloud.yaml, HPA
├── specs/
│   ├── phase-v/           # Phase V authoritative specs
│   │   ├── phase-v-spec.md
│   │   ├── event-consumers.md
│   │   └── reusable-intelligence.md
│   ├── architecture/
│   ├── deployment/
│   ├── aiops/
│   └── frontend/
├── scripts/
├── .spec-kit/
└── README.md
```

## 🚀 **Getting Started**

### **Prerequisites**

- **Node.js 18+** and npm
- **Python 3.9+** and pip
- **PostgreSQL Database** (Neon recommended)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### **Installation**

1. **Clone the repository** (if applicable)

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Install Server Dependencies** (Optional - for chat API)
   ```bash
   cd server
   npm install
   ```

### **Environment Setup**

1. **Backend Environment** (`backend/.env`)
   ```env
   DATABASE_URL=your_neon_postgresql_connection_string
   JWT_SECRET_KEY=your_secret_key_here
   JWT_ALGORITHM=HS256
   ```

2. **Frontend Environment** (`frontend/.env`)
   ```env
   VITE_BACKEND_API_URL=http://localhost:8000
   ```

3. **Server Environment** (`server/.env`) - Optional
   ```env
   BACKEND_API_URL=http://localhost:8000
   PORT=3001
   ```

### **Running the Application**

1. **Start Backend Server**
   ```bash
   cd backend
   python -m uvicorn api.index:app --reload --port 8000
   ```
   Backend will be available at `http://localhost:8000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. **Start Chat API Server** (Optional)
   ```bash
   cd server
   npm run dev
   ```
   Chat API will be available at `http://localhost:3001`

### **Build for Production**

**Frontend Build**
```bash
cd frontend
npm run build
```

**Preview Production Build**
```bash
cd frontend
npm run preview
```

## 🔄 **Development Workflow**

This project follows **Spec-Driven Development (SDD)** methodology as defined in `.specify/memory/constitution.md`:

1. **Constitution** ✅ - Project principles and standards defined
2. **Specification** ✅ - Requirements documented in `.specify/spec.md`
3. **Planning** ✅ - Technical plan in `.specify/plan.md`
4. **Data Model** ✅ - Data structures in `.specify/data-model.md`
5. **Tasks** ✅ - Task breakdown in `.specify/tasks.md`
6. **Implementation** ✅ - Code implementation complete

### **Development Principles**

- **Spec-Driven**: All features specified before implementation
- **Code Quality**: Clean code, self-documenting, consistent style
- **Testing**: High test coverage with clear, maintainable tests
- **Documentation**: Keep specifications and code comments up to date
- **User Experience**: Prioritize usability and responsive design
- **Performance**: Optimize for performance and scalability

## 💻 **Usage**

### **Basic Operations**

1. **Sign Up / Login**
   - Create an account or sign in to access your todos
   - Password must meet strength requirements (8+ chars, uppercase, lowercase, number, special char)

2. **Create a Todo**
   - Fill in the form with title (required), description, due date, and priority
   - Click "Add Todo" or use the chatbot: "Create a todo called [title]"

3. **Edit a Todo**
   - Click the "Edit" button on any todo item
   - Modify fields in the popup modal
   - Click "Update Todo" to save changes

4. **Complete a Todo**
   - Check the checkbox next to the todo title
   - Or use chatbot: "Complete the todo [title]"

5. **Delete a Todo**
   - Click the "Delete" button (red button)
   - Confirm deletion in the dialog
   - Or use chatbot: "Delete the todo [title]"

### **Filtering & Sorting**

- **Filter by Status**: All, Pending, Completed
- **Filter by Priority**: All, Low, Medium, High
- **Filter by Tag**: All or a specific tag
- **Filter by Due Date**: All, Today, This Week, Overdue
- **Sort by**: Due Date, Priority, Creation Date, Title
- **Sort Order**: Ascending or Descending

### **Search**

- Type in the search bar to find todos by title or description
- Search is case-insensitive and updates in real-time

### **Chatbot Assistant**

Open the chatbot from the bottom-right corner and try:

- **Create**: "Create a todo called Buy groceries for the weekend party"
- **List**: "Show my todos" or "What are my todos"
- **Complete**: "Complete the todo Buy groceries"
- **Delete**: "Delete the todo Review documents"
- **Count**: "How many todos do I have"

The chatbot automatically generates detailed descriptions for all created tasks.

## 🏗 **Architecture**

### **Frontend Architecture**
```
React Components
    ↓
Context API (State Management)
    ↓
Custom Hooks (Business Logic)
    ↓
API Service (HTTP Client)
    ↓
Backend API (FastAPI)
    ↓
Neon PostgreSQL Database
```

### **Authentication Flow**
```
User Sign Up/Login
    ↓
JWT Token Generated
    ↓
Token Stored in localStorage
    ↓
Token Attached to API Requests
    ↓
Backend Validates Token
    ↓
Protected Routes Accessible
```

### **Chatbot Flow**
```
User Input (Natural Language)
    ↓
Chat Parser (Rule-based)
    ↓
Command Extraction
    ↓
API Service Calls
    ↓
Backend API
    ↓
Database Update
    ↓
UI Refresh
```

## 🧪 **Testing**

Run tests:
```bash
cd frontend
npm test
```

Run tests with UI:
```bash
cd frontend
npm run test:ui
```

## 🌐 **Browser Support**

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📝 **License**

This project is part of **Hackathon II — Phase V (Advanced Cloud Deployment & Event-Driven AI Todo)** by **Roll # 00037391**.

## 🙏 **Acknowledgments**

- Built with Spec-Driven Development (Spec-Kit Plus, Claude Code)
- Phase V: event-driven architecture (Dapr/Kafka), advanced features, Kubernetes, CI/CD
- Mobile-first responsive UI; reusable MCP tools and chatbot intelligence

---

**For GIAIC Hackathon II — Phase V by Roll # 00037391**
