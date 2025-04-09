import PageHeader, { PageHeaderProps } from 'components/PageHeader'
import useTheme from 'hooks/useTheme'

const MarketPageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = (props) => {
  const { theme } = useTheme()
  const background = theme.isDark
    ? 'linear-gradient(166.77deg,rgb(203, 144, 49) 0%,rgb(49, 49, 45) 100%)'
    : 'linear-gradient(111.68deg, #f2ecf2 0%, #e8f2f6 100%)'
  return <PageHeader background={background} {...props} />
}

export default MarketPageHeader
