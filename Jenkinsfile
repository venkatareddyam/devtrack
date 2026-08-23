pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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
                            withEnv(["JAVA_HOME=${jdkHome}", "PATH+JAVA=${jdkHome}\\bin"]) {
                                sh 'java -version && npx sonar-scanner'
                            }
                        }
                    }
                }
            }
        }
stage('Build Docker Image') {
    steps {
        sh '''
            eval $(minikube -p minikube docker-env)
            docker build -t devtrack:${BUILD_NUMBER} .
            docker images devtrack
        '''
    }
}

stage('Deploy to Kubernetes') {
    steps {
        sh '''
            kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                set image deployment/devtrack \
                devtrack=devtrack:${BUILD_NUMBER}

            kubectl --kubeconfig=/c/Users/Lenovo/.kube/config \
                rollout status deployment/devtrack
        '''
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
