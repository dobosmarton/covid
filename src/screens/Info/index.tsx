import styled from "styled-components";
import { NextSeo } from "next-seo";
import Header from "../../components/header";
import { Container } from "../../components/Layout/container";
import { Content } from "../../components/Layout/content";

const SectionLabel = styled.h2`
  color: ${({ theme: { colors } }) => colors.darkGrey};
  margin-top: 20px;
`;

export default () => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://www.covidinspector.com/info",
          title: "Coronavirus informations",
          description:
            "Information about the Coronavirus and link of the Coronavirus data source"
        }}
      />
      <Header withSearch={false} />
      <Container>
        <Content>
          <SectionLabel>Coronavirus</SectionLabel>
          <span>
            Coronavirus disease (COVID-19) is an infectious disease caused by a
            newly discovered coronavirus. Most people infected with the COVID-19
            virus will experience mild to moderate respiratory illness and
            recover without requiring special treatment. Older people, and those
            with underlying medical problems like cardiovascular disease,
            diabetes, chronic respiratory disease, and cancer are more likely to
            develop serious illness. The best way to prevent and slow down
            transmission is be well informed about the COVID-19 virus, the
            disease it causes and how it spreads. Protect yourself and others
            from infection by washing your hands or using an alcohol based rub
            frequently and not touching your face. The COVID-19 virus spreads
            primarily through droplets of saliva or discharge from the nose when
            an infected person coughs or sneezes, so it’s important that you
            also practice respiratory etiquette (for example, by coughing into a
            flexed elbow). At this time, there are no specific vaccines or
            treatments for COVID-19. However, there are many ongoing clinical
            trials evaluating potential treatments. WHO will continue to provide
            updated information as soon as clinical findings become available.
          </span>
          <SectionLabel>Resources</SectionLabel>

          <span>World Health Organization</span>
          <a
            href="https://www.who.int/health-topics/coronavirus"
            target="_blank"
          >
            https://www.who.int/health-topics/coronavirus
          </a>

          <span>JSON time-series of coronavirus cases</span>
          <a href="https://github.com/pomber/covid19" target="_blank">
            https://github.com/pomber/covid19
          </a>
        </Content>
      </Container>
    </>
  );
};
