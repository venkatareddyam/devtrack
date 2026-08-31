# 🚀 DevTrack

> A full-stack DevOps learning project demonstrating a complete CI/CD workflow using **Node.js, Docker, Jenkins, SonarQube, Kubernetes, and Minikube**.

DevTrack is a RESTful Task Management API built with Node.js and Express. The project goes beyond application development by implementing a practical DevOps workflow including automated testing, code quality analysis, Docker containerization, and Kubernetes deployment.

---

## 📌 Overview

The goal of this project is to understand how a modern application moves through a complete software delivery pipeline.

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins CI/CD Pipeline
    │
    ├── 📥 Checkout Source Code
    │
    ├── 📦 Install Dependencies
    │
    ├── 🧪 Run Tests
    │
    ├── 🔍 SonarQube Analysis
    │
    ├── 🐳 Build Docker Image
    │
    └── ☸️ Deploy to Kubernetes
             │
             ▼
          Minikube
             │
             ▼
        DevTrack API
```

---

## ✨ Features

* Create tasks
* Retrieve tasks
* Update tasks
* Delete tasks
* RESTful API architecture
* Automated API testing
* Unique task IDs using `crypto.randomUUID()`
* Docker containerization
* Jenkins CI/CD pipeline
* SonarQube code quality analysis
* Kubernetes deployment
* Local Kubernetes environment using Minikube

---

## 🛠️ Technology Stack

### Application

* **Node.js**
* **Express.js**
* **dotenv**

### Testing

* **Jest**
* **Supertest**

### DevOps & Infrastructure

* **Docker**
* **Jenkins**
* **SonarQube**
* **Kubernetes**
* **Minikube**

### Version Control

* **Git**
* **GitHub**

---

## 📂 Project Structure

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
├── Dockerfile
├── Jenkinsfile
├── package.json
├── package-lock.json
├── .dockerignore
├── .gitignore
└── README.md
```

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

Start the application:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The application runs locally on:

```text
http://localhost:3000
```

---

# 🧪 Testing

The project uses **Jest** and **Supertest** for automated testing.

Run the test suite:

```bash
npm test
```

The tests validate the API functionality and task operations.

---

# 📡 API Endpoints

## Create a Task

```http
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

```http
GET /api/tasks
```

---

## Update a Task

```http
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

```http
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

Verify that the container is running:

```bash
docker ps
```

The API will be available at:

```text
http://localhost:3000
```

---

# 🔍 SonarQube

SonarQube is integrated into the CI/CD pipeline to perform automated static code analysis.

The analysis helps identify:

* Bugs
* Code smells
* Maintainability issues
* Potential security issues
* Code quality problems

The SonarQube analysis is executed automatically during the Jenkins pipeline.

---

# ⚙️ Jenkins CI/CD Pipeline

The project contains a declarative Jenkins pipeline defined in the `Jenkinsfile`.

The pipeline automates the following workflow.

## Pipeline Stages

### 1️⃣ Checkout

Jenkins retrieves the latest source code from the Git repository.

---

### 2️⃣ Check Kubernetes

The pipeline verifies that the Kubernetes cluster is accessible.

Example checks:

```bash
kubectl config current-context
kubectl get nodes
```

---

### 3️⃣ Install Dependencies

Project dependencies are installed using:

```bash
npm ci
```

Using `npm ci` ensures consistent dependency installation based on `package-lock.json`.

---

### 4️⃣ Run Tests

Automated tests are executed using:

```bash
npm test
```

---

### 5️⃣ SonarQube Analysis

The project source code is analyzed by SonarQube.

This stage helps ensure that code quality issues are identified before deployment.

---

### 6️⃣ Build Docker Image

The Docker image is built using the Jenkins build number.

Example:

```text
Jenkins Build #35
```

Produces:

```text
devtrack:35
```

This provides unique image versioning for every pipeline build.

---

### 7️⃣ Deploy to Kubernetes

The Kubernetes deployment is updated with the Docker image generated by the current Jenkins build.

Example:

```text
devtrack:35
```

The pipeline then waits for the Kubernetes rollout to complete.

---

# 🔄 CI/CD Workflow

```text
┌──────────────┐
│  Developer   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    GitHub    │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│     Jenkins      │
│    CI/CD Pipeline│
└──────┬───────────┘
       │
       ├──────────────► Install Dependencies
       │
       ├──────────────► Run Tests
       │
       ├──────────────► SonarQube Analysis
       │
       ├──────────────► Build Docker Image
       │
       ▼
┌──────────────────┐
│    Kubernetes    │
│     Minikube     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   DevTrack API   │
└──────────────────┘
```

---

# ☸️ Kubernetes

The Kubernetes deployment configuration is located in:

```text
k8s/deployment.yaml
```

## Deploy the Application

```bash
kubectl apply -f k8s/deployment.yaml
```

---

## Check Deployments

```bash
kubectl get deployments
```

---

## Check Pods

```bash
kubectl get pods
```

---

## View Pod Details

```bash
kubectl describe pod <pod-name>
```

---

## View Application Logs

```bash
kubectl logs <pod-name>
```

---

# 🔄 Docker Image Versioning

Jenkins uses the build number to create unique Docker image tags.

For example:

```text
Build #35
```

Creates:

```text
devtrack:35
```

The Kubernetes deployment is then updated to use the corresponding image.

This approach provides:

* Clear build identification
* Easier troubleshooting
* Better deployment traceability
* Improved version tracking
* Easier rollback to a previous version

---

# 🖥️ Minikube

Minikube provides a local Kubernetes environment for this project.

## Check Minikube Status

```bash
minikube status
```

Expected output:

```text
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

---

## Start Minikube

```bash
minikube start
```

---

## Check Kubernetes Nodes

```bash
kubectl get nodes
```

---

# 🔧 Useful Commands

## Docker

List Docker images:

```bash
docker images
```

List running containers:

```bash
docker ps
```

---

## Kubernetes

Check pods:

```bash
kubectl get pods
```

Check deployments:

```bash
kubectl get deployments
```

Check services:

```bash
kubectl get services
```

View logs:

```bash
kubectl logs <pod-name>
```

Describe a pod:

```bash
kubectl describe pod <pod-name>
```

Restart the deployment:

```bash
kubectl rollout restart deployment devtrack
```

Check rollout status:

```bash
kubectl rollout status deployment/devtrack
```

Check the currently deployed image:

```bash
kubectl get deployment devtrack \
-o jsonpath='{.spec.template.spec.containers[0].image}{"\n"}'
```

---

# 🧠 DevOps Concepts Demonstrated

## Continuous Integration

The Jenkins pipeline automatically:

* Retrieves the source code
* Installs dependencies
* Runs automated tests
* Performs code quality analysis

---

## Continuous Delivery

The application is:

* Packaged as a Docker image
* Versioned using Jenkins build numbers
* Prepared for Kubernetes deployment

---

## Containerization

Docker packages the application and its dependencies into a consistent, portable environment.

---

## Code Quality

SonarQube performs automated static code analysis to identify potential issues.

---

## Container Orchestration

Kubernetes manages the deployment and lifecycle of the application.

---

## CI/CD Automation

Jenkins connects the complete workflow into an automated pipeline.

---

# 🎯 Learning Objectives

This project was built to gain hands-on experience with:

* REST API development
* Node.js and Express
* Automated testing
* Git and GitHub workflows
* Docker containerization
* Jenkins pipelines
* SonarQube integration
* Kubernetes deployments
* Minikube
* CI/CD automation
* Docker image versioning

---

# 🔮 Future Improvements

Potential improvements for the project include:

* [ ] Add a persistent database
* [ ] Integrate MongoDB or PostgreSQL
* [ ] Add user authentication
* [ ] Implement JWT authorization
* [ ] Add Swagger/OpenAPI documentation
* [ ] Add Docker Compose
* [ ] Add Kubernetes Service configuration
* [ ] Add Kubernetes Ingress
* [ ] Add Horizontal Pod Autoscaling
* [ ] Add application health checks
* [ ] Add centralized logging
* [ ] Add monitoring
* [ ] Deploy to AWS
* [ ] Integrate GitHub Actions
* [ ] Add automated deployment notifications

---

# 📈 Project Architecture

```text
                     ┌───────────────┐
                     │    GitHub     │
                     │ Source Control│
                     └───────┬───────┘
                             │
                             ▼
                     ┌───────────────┐
                     │    Jenkins    │
                     │ CI/CD Pipeline│
                     └───────┬───────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐    ┌───────────┐   ┌─────────┐
        │  Tests   │    │ SonarQube │   │ Docker  │
        └──────────┘    └───────────┘   └────┬────┘
                                             │
                                             ▼
                                     ┌──────────────┐
                                     │  Kubernetes  │
                                     │   Minikube   │
                                     └──────┬───────┘
                                            │
                                            ▼
                                     ┌──────────────┐
                                     │   DevTrack   │
                                     │     API      │
                                     └──────────────┘
```

---

# 👨‍💻 Author

**Venkata Subbareddy Reddyam**

GitHub: https://github.com/venkatareddyam

Repository: https://github.com/venkatareddyam/devtrack

---

# 🤝 Acknowledgements

This project was created as a hands-on learning project focused on understanding the complete software development and DevOps lifecycle.

The project demonstrates the journey from:

```text
Write Code
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

# 📄 License

This project is intended for educational and learning purposes.

Feel free to explore the project, learn from it, and improve it.

---

⭐ **If you found this project helpful, consider giving the repository a star!**
