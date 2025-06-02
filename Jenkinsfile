pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'splitdeal-image'
    }

    stages {
        stage('Build') {
            steps {
                echo '🔨 Building the Docker image...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running unit tests with Mocha...'
                sh 'npm install'
                sh 'npm test' // Assumes "test" script exists in package.json
            }
        }

        stage('Security Scan') {
            steps {
                echo '🔐 Running Trivy for vulnerability scanning...'
                sh 'trivy image $DOCKER_IMAGE || true'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying container with Docker Compose...'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
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
