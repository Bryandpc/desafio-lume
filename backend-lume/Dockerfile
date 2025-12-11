FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn -q dependency:go-offline

COPY src ./src

RUN mvn -q clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/desafio-lume-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV SECURITY_JWT_SECRET_KEY=wjY5F!vrXBzmJS4I%D9zdftkUs0N@YsfYCtPk30dwN!eO8mQtGjr*YKgIsEp0&%J \
    SECURITY_JWT_EXPIRATION=300000 \
    SECURITY_JWT_REFRESH_EXPIRATION=600000

ENTRYPOINT ["sh", "-c", "java -jar app.jar"]
