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
                withEnv(["PATH+DOCKER=${env.DOCKER_HOME}"]) {
                    sh 'docker build -t devtrack:${BUILD_NUMBER} .'
                }
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