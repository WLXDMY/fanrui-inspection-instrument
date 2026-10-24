FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre

RUN groupadd --gid 10001 instrument && \
    useradd --uid 10001 --gid 10001 --no-create-home --shell /usr/sbin/nologin instrument

WORKDIR /app
COPY --from=build --chown=10001:10001 --chmod=0444 /build/target/instrument-extension-service-1.0.0.jar /app/application.jar

USER 10001:10001
EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-Djava.security.egd=file:/dev/urandom", "-jar", "/app/application.jar"]
