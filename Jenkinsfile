pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ashok3182004/to-do-list'
    }

    stages {
        stage('Clone') {
    steps {
        git branch: 'main', url: 'https://github.com/ashoknirmal/to-do-list.git'
    }
}

        stage('Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8080:80 $DOCKER_IMAGE'
            }
        }
    }
}
