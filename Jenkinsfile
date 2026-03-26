pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // In a real scenario, this would be: 
                // git 'https://github.com/USERNAME/REPO_NAME.git'
                echo 'Cloning repository...'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Automated Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Report') {
            steps {
                echo 'Test Execution Report Generated Successfully.'
                // You could use plugins like Junit to display the reports visually in Jenkins
            }
        }
    }

    post {
        always {
            echo 'Pipeline has finished execution.'
        }
        failure {
            echo 'Pipeline FAILED. Please check the logs.'
        }
    }
}
