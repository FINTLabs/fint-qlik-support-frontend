pipeline {
    agent { label 'docker' }
    stages {
        stage('Build') {
            steps {
                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker build --tag ${GIT_COMMIT} ."
                }
            }
        }
        stage('Publish') {
            when {
                branch 'master'
            }
            steps {
                sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/vigo-ticket-frontend:build.${BUILD_NUMBER}"
                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker push fintlabsacr.azurecr.io/vigo-ticket-frontend:build.${BUILD_NUMBER}"
                }
                kubernetesDeploy configs: 'k8s-beta.yaml', kubeconfigId: 'aks-beta-fint'
            }
        }
        stage('Publish Version') {
            when {
                tag pattern: "v\\d+\\.\\d+\\.\\d+(-\\w+-\\d+)?", comparator: "REGEXP"
            }
            steps {
                script {
                    VERSION = TAG_NAME[1..-1]
                }
                sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/vigo-ticket-frontend:${VERSION}"
                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker push fintlabsacr.azurecr.io/vigo-ticket-frontend:${VERSION}"
                }
            }
        }
        stage('Publish PR') {
            when { changeRequest() }
            steps {
                sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/vigo-ticket-frontend:${BRANCH_NAME}.${BUILD_NUMBER}"
                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker push fintlabsacr.azurecr.io/vigo-ticket-frontend:${BRANCH_NAME}.${BUILD_NUMBER}"
                }
            }
        }
    }
}
