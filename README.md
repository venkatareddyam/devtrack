# DevTrack 🚀

A production-style **Task Management REST API** built with **Node.js and Express**, containerized with Docker and integrated with a complete local **CI/CD pipeline using Jenkins, SonarQube, Kubernetes, and Minikube**.

This project demonstrates a practical DevOps workflow—from application development and automated testing to code quality analysis, containerization, and Kubernetes deployment.

---

## 📌 Project Overview

DevTrack is a RESTful API that allows users to manage tasks.

The application supports creating, retrieving, updating, and deleting tasks through REST API endpoints.

The project also demonstrates modern DevOps practices including:

* Automated CI/CD pipelines
* Automated testing
* Static code analysis
* Docker containerization
* Kubernetes deployment
* Local Kubernetes orchestration using Minikube

---

# 🛠️ Technology Stack

### Application

* Node.js
* Express.js
* dotenv

### Testing

* Jest
* Supertest

### DevOps & Infrastructure

* Docker
* Jenkins
* SonarQube
* Kubernetes
* Minikube

### Version Control

* Git
* GitHub

---

# 📂 Project Structure

```text
devtrack/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── task.test.js
│
├── k8s/
│   └── deployment.yaml
│
├── Jenkinsfile
├── Dockerfile
├── package.json
├── package-lock.json
├── .dockerignore
├── .gitignore
└── README.md
```

---

# ✨ Features

* Create a task
* Retrieve tasks
* Update tasks
* Delete tasks
* RESTful API architecture
* Automated unit and API testing
* Unique task IDs using `crypto.randomUUID()`
* Docker containerization
* SonarQube code quality analysis
* Jenkins CI/CD automation
* Kubernetes deployment
* Minikube local Kubernetes environment

---

# 🚀 Getting Started

## Prerequisites

Make sure the following tools are installed:

* Node.js
* npm
* Git
* Docker Desktop
* Jenkins
* SonarQube
* kubectl
* Minikube

---

## Clone the Repository

```bash
git clone https://github.com/venkatareddyam/devtrack.git
```

Move into the project directory:

```bash
cd devtrack
```

---

## Install Dependencies

```bash
npm ci
```

---

## Run the Application

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The application runs on:

```text
http://localhost:3000
```

---

# 🧪 Running Tests

Run the automated test suite:

```bash
npm test
```

The project uses:

* Jest
* Supertest

The test suite validates the API functionality and task operations.

---

# 📡 API Endpoints

## Create a Task

```text
POST /api/tasks
```

Example request:

```json
{
  "title": "Learn Kubernetes",
  "description": "Deploy DevTrack to Kubernetes"
}
```

---

## Get All Tasks

```text
GET /api/tasks
```

---

## Update a Task

```text
PUT /api/tasks/:id
```

Example request:

```json
{
  "title": "Learn Kubernetes and DevOps"
}
```

---

## Delete a Task

```text
DELETE /api/tasks/:id
```

---

# 🐳 Docker

The application is containerized using Docker.

## Build the Docker Image

```bash
docker build -t devtrack:1.0.0 .
```

---

## Run the Container

```bash
docker run -d -p 3000:3000 --name devtrack-api devtrack:1.0.0
```

Verify the container:

```bash
docker ps
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🔍 SonarQube Code Analysis

SonarQube is used to analyze the project for:

* Code quality issues
* Bugs
* Code smells
* Security vulnerabilities
* Maintainability issues

The Jenkins pipeline automatically executes SonarQube analysis during the CI process.

---

# ⚙️ Jenkins CI/CD Pipeline

The project includes a `Jenkinsfile` that automates the complete CI/CD workflow.

## Pipeline Stages

### 1. Checkout

Jenkins retrieves the latest source code from the Git repository.

### 2. Check Kubernetes

The pipeline verifies Kubernetes connectivity and checks the cluster status.

### 3. Install Dependencies

```bash
npm ci
```

Dependencies are installed using the lock file for consistent builds.

### 4. Run Tests

```bash
npm test
```

Automated tests are executed before deployment.

### 5. SonarQube Analysis

The application source code is analyzed using SonarQube.

### 6. Build Docker Image

A Docker image is created using the Jenkins build number.

Example:

```text
devtrack:35
```

### 7. Deploy to Kubernetes

The application is deployed to the Kubernetes cluster.

The deployment image is updated dynamically using the Jenkins build number.

---

# 🔄 CI/CD Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Checkout Code
    │
    ├── Install Dependencies
    │
    ├── Run Tests
    │
    ├── SonarQube Analysis
    │
    ├── Build Docker Image
    │
    └── Deploy to Kubernetes
            │
            ▼
        Minikube
            │
            ▼
      DevTrack Application
```

---

# ☸️ Kubernetes Deployment

The Kubernetes deployment configuration is located at:

```text
k8s/deployment.yaml
```

Apply the deployment:

```bash
kubectl apply -f k8s/deployment.yaml
```

Check the deployment:

```bash
kubectl get deployments
```

Check the pods:

```bash
kubectl get pods
```

Check detailed pod information:

```bash
kubectl describe pod <pod-name>
```

---

# 🐳 Docker Image Versioning

Jenkins uses the build number to create unique Docker image versions.

Example:

```text
Build #35
```

Creates:

```text
devtrack:35
```

The Kubernetes deployment is then updated to use the corresponding image.

This approach helps provide:

* Better version tracking
* Easier rollback
* Clear build identification
* Improved deployment traceability

---

# 🔧 Useful Kubernetes Commands

## Check Pods

```bash
kubectl get pods
```

## Check Deployments

```bash
kubectl get deployments
```

## Check Services

```bash
kubectl get services
```

## View Pod Logs

```bash
kubectl logs <pod-name>
```

## Describe a Pod

```bash
kubectl describe pod <pod-name>
```

## Check the Current Deployment Image

```bash
kubectl get deployment devtrack \
-o jsonpath='{.spec.template.spec.containers[0].image}{"\n"}'
```

## Restart Deployment

```bash
kubectl rollout restart deployment devtrack
```

## Check Rollout Status

```bash
kubectl rollout status deployment devtrack
```

---

# 🖥️ Minikube

Check Minikube status:

```bash
minikube status
```

Start Minikube:

```bash
minikube start
```

View Kubernetes nodes:

```bash
kubectl get nodes
```

---

# 🧠 DevOps Concepts Demonstrated

This project demonstrates several important DevOps concepts.

### Continuous Integration

Every build can automatically:

* Retrieve source code
* Install dependencies
* Run tests
* Analyze code quality

### Continuous Delivery

The application is:

* Packaged as a Docker image
* Versioned using Jenkins build numbers
* Prepared for Kubernetes deployment

### Containerization

Docker ensures that the application runs consistently across different environments.

### Code Quality

SonarQube provides automated static code analysis.

### Container Orchestration

Kubernetes manages application deployment and lifecycle.

### CI/CD Automation

Jenkins connects all stages into a single automated pipeline.

---

# 🎯 Learning Objectives

This project was created to gain hands-on experience with:

* Node.js application development
* REST API development
* Automated testing
* Git and GitHub workflows
* Docker containerization
* Jenkins pipelines
* SonarQube integration
* Kubernetes deployments
* Minikube
* CI/CD concepts

---

# 🔮 Future Improvements

Possible future enhancements include:

* [ ] Add persistent database storage
* [ ] Add MongoDB or PostgreSQL
* [ ] Add user authentication
* [ ] Implement JWT authorization
* [ ] Add API documentation using Swagger/OpenAPI
* [ ] Add Docker Compose
* [ ] Add Kubernetes Service configuration
* [ ] Add Kubernetes Ingress
* [ ] Add Horizontal Pod Autoscaling
* [ ] Deploy to AWS
* [ ] Add GitHub Actions
* [ ] Add automated deployment notifications
* [ ] Add production monitoring and logging

---

# 👨‍💻 Author

**Venkata Subbareddy Reddyam**

GitHub: https://github.com/venkatareddyam

Project Repository:

https://github.com/venkatareddyam/devtrack

---

# ⭐ Acknowledgements

This project was built as a hands-on learning project to practice modern software development and DevOps tools.

The focus is on understanding how an application moves through a complete workflow:

```text
Code
  ↓
Test
  ↓
Analyze
  ↓
Build
  ↓
Containerize
  ↓
Deploy
  ↓
Run on Kubernetes
```

---

## 📜 License

This project is intended for educational and learning purposes.

Feel free to explore, learn from, and improve the project.
