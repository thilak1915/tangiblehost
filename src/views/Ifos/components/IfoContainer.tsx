import { ReactElement } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Box, LinkExternal } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import IfoLayout, { IfoLayoutWrapper } from './IfoLayout'
import IfoPoolVaultCard from './IfoPoolVaultCard'
import IfoQuestions from './IfoQuestions'

const IfoStepBackground = styled(Box)`
  background: linear-gradient(139.73deg, #e5fdff 0%, #f3efff 100%);
`

interface TypeProps {
  ifoSection: ReactElement
  ifoSteps: ReactElement
}

const IfoContainer: React.FC<React.PropsWithChildren<TypeProps>> = ({ ifoSection, ifoSteps }) => {
  const { t } = useTranslation()

  return (
    <IfoLayout id="current-ifo" py={['24px', '24px', '40px']}>
      <Container>
        <IfoLayoutWrapper>
          <IfoPoolVaultCard />
          {ifoSection}
        </IfoLayoutWrapper>
      </Container>
      <IfoStepBackground>
        <Container>{ifoSteps}</Container>
      </IfoStepBackground>
      <Container>
        <IfoQuestions />
        <LinkExternal
          href="https://docs.pancakeswap.finance/contact-us/business-partnerships#ifos-token-sales"
          mx="auto"
          mt="16px"
        >
          {t('Apply to run an IFO!')}
        </LinkExternal>
      </Container>
    </IfoLayout>
  )
}

export default IfoContainer
