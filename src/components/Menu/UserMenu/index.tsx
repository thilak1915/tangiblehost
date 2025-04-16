import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import {
  Box,
  Button,
  Flex,
  LogoutIcon,
  RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from 'state/transactions/hooks'
import { useAccount } from 'wagmi'
import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const [accountV2, setAccountV2] = useState<string | null>(null)
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile?.nft?.image?.thumbnail
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])
  useEffect(() => {
    if (localStorage?.getItem('connectorIdv2') === 'rabby' && localStorage?.getItem('wallet')) {
      setAccountV2(() => localStorage?.getItem('wallet'))
    }
  }, [])
  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }

  // const UserMenuItems = () => {
  //   return (
  //     <>
  //       <WalletUserMenuItem isWrongNetwork={isWrongNetwork} onPresentWalletModal={onClickWalletMenu} />
  //       <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentTransactionModal}>
  //         {t('Recent Transactions')}
  //         {hasPendingTransactions && <RefreshIcon spin />}
  //       </UserMenuItem>
  //       {/* <UserMenuDivider />
  //       <NextLink href={`/profile/${account?.toLowerCase()}`} passHref>
  //         <UserMenuItem as="a" disabled={isWrongNetwork || chainId !== ChainId.BSC}>
  //           {t('Your NFTs')}
  //         </UserMenuItem>
  //       </NextLink>
  //       <ProfileUserMenuItem
  //         isLoading={isLoading}
  //         hasProfile={hasProfile}
  //         disabled={isWrongNetwork || chainId !== ChainId.BSC}
  //       /> */}
  //       <UserMenuDivider />
  //       <UserMenuItem as="button" onClick={logout}>
  //         <Flex alignItems="center" justifyContent="space-between" width="100%">
  //           {t('Disconnect')}
  //           <LogoutIcon />
  //         </Flex>
  //       </UserMenuItem>
  //     </>
  //   )
  // }

  // if (account) {
  //   return (
  //     <UIKitUserMenu account={account} avatarSrc={avatarSrc} text={userMenuText} variant={userMenuVariable}>
  //       {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
  //     </UIKitUserMenu>
  //   )
  // }

  // if (isWrongNetwork) {
  //   return (
  //     <UIKitUserMenu text={t('Network')} variant="danger">
  //       {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
  //     </UIKitUserMenu>
  //   )
  // }
  async function disconnectWallet() {
    try {
      // if (window.ethereum && window.ethereum.isRabby) {
      //   await window.ethereum.request({
      //     method: "wallet_revokePermissions",
      //     params: [
      //       {
      //         eth_accounts: {},
      //       },
      //     ],
      //   });
      //   console.log("Requested permission revocation");
      // }
      setAccountV2(() => null)
      localStorage.removeItem('connectorIdv2')
      localStorage.removeItem('wallet')

      console.log('Wallet disconnected (local + permission attempt)')
    } catch (err) {
      console.warn('Revoke permissions failed or not supported by provider', err)
    }
  }
  async function connectRabbyWallet() {
    if (window.ethereum && window.ethereum.isRabby) {
      try {
        if (localStorage?.getItem('connectorIdv2') === 'rabby' && localStorage?.getItem('wallet')) {
          disconnectWallet()
        } else {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          console.log('Connected account:', accounts[0])
          localStorage?.setItem('connectorIdv2', 'rabby')
          localStorage?.setItem('wallet', accounts[0])
          setAccountV2(() => accounts[0])
        }
      } catch (error) {
        console.error('Failed to connect to Rabby wallet:', error)
      }
    } else {
      console.error('Rabby wallet is not installed')
    }
  }

  return (
    <>
      <Button onClick={() => connectRabbyWallet()} scale="sm" style={{ marginRight: '15px' }}>
        <Trans>{accountV2 ? `${accountV2?.slice(0, 8)}...xxxx` : 'Connect Rabby'}</Trans>
      </Button>
      <style jsx global>{`
        w3m-modal {
          position: relative;
          z-index: 99;
        }
      `}</style>
      {/* <ConnectWalletButton scale="sm">
        <Box display={['none', , , 'block']}>
          <Trans>Connect Wallet</Trans>
        </Box>
        <Box display={['block', , , 'none']}>
          <Trans>Connect</Trans>
        </Box>
      </ConnectWalletButton> */}
    </>
  )
}

export default UserMenu
