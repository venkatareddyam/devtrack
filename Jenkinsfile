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
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
        steps {
        withEnv(["PATH+DOCKER=${env.DOCKER_HOME}"]) {
            sh 'docker build -t devtrack:${BUILD_NUMBER} .'
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