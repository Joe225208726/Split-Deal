pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'splitdeal-image'
    }

    stages {
        stage('Build') {
            steps {
                echo '🔨 Building the Docker image...'
                bat "docker rmi -f %DOCKER_IMAGE% || exit /b 0"
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running unit tests...'
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('Security Scan') {
            steps {
                echo '🔐 Running security scan...'
                bat 'npm audit || exit /b 0'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying with Docker Compose...'
                bat 'docker-compose down || exit /b 0'
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
