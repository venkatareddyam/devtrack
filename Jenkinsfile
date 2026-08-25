pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Kubernetes') {
            steps {
                sh '''
                    kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                        config current-context

                    kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                        get nodes
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                withEnv(["PATH+NODE=${env.NODE_HOME}"]) {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                withEnv(["PATH+NODE=${env.NODE_HOME}"]) {
                    sh 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withEnv([
                        "PATH+NODE=${env.NODE_HOME}",
                        "PATH+WINDOWS=C:\\Windows\\System32"
                    ]) {
                        script {
                            def jdkHome = tool name: 'JDK21', type: 'hudson.model.JDK'

                            withEnv([
                                "JAVA_HOME=${jdkHome}",
                                "PATH+JAVA=${jdkHome}\\bin"
                            ]) {
                                sh 'java -version && npx sonar-scanner'
                            }
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
    steps {
        withEnv([
            "PATH+WINDOWS=C:\\Windows\\System32",
            "PATH+MINIKUBE=C:\\Program Files\\Kubernetes\\Minikube",
            "MINIKUBE_HOME=C:\\Users\\Lenovo\\.minikube",
            "KUBECONFIG=C:\\Users\\Lenovo\\.kube\\config"
        ]) {
            sh '''
                echo "Checking Minikube"
                minikube -p minikube status

                echo "Configuring Docker to use Minikube"

                eval $(minikube -p minikube docker-env)

                echo "Building Docker image devtrack:${BUILD_NUMBER}"

                docker build -t devtrack:${BUILD_NUMBER} .

                echo "Verifying image"

                docker images | grep devtrack
            '''
        }
    }
}

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                        apply -f k8s/deployment.yaml

                    kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                        set image deployment/devtrack \
                        devtrack=devtrack:${BUILD_NUMBER}

                    kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                        rollout status deployment/devtrack
                '''
            }
        }
    }

    post {
        success {
            echo 'DevTrack CI pipeline completed successfully.'
        }

        failure {
            echo 'DevTrack CI pipeline failed.'
        }
    }
}