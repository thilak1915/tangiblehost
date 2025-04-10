import { useEffect, useCallback } from 'react'
import { ConnectorNotFoundError, UserRejectedRequestError, useClient, useConnect } from 'wagmi'

const SAFE_ID = 'safe'
const MAX_RETRIES = 3
const RETRY_DELAY = 2000

const useEagerConnect = () => {
  const client = useClient()
  const { connectAsync, connectors } = useConnect()

  const tryConnect = useCallback(
    async (connector: any, retries = 0) => {
      try {
        await connectAsync({ connector })
      } catch (error) {
        if (error instanceof UserRejectedRequestError) {
          // User rejected, don't retry
          return
        }
        if (error instanceof ConnectorNotFoundError || retries >= MAX_RETRIES) {
          // Fallback to auto connect if connector not found or max retries reached
          client.autoConnect()
          return
        }
        // Retry connection after delay
        setTimeout(() => {
          tryConnect(connector, retries + 1)
        }, RETRY_DELAY)
      }
    },
    [connectAsync, client],
  )

  useEffect(() => {
    const connectorInstance = connectors.find((c) => c.id === SAFE_ID && c.ready)
    if (connectorInstance && !window.cy) {
      tryConnect(connectorInstance)
    } else {
      client.autoConnect()
    }
  }, [client, connectors, tryConnect])
}

export default useEagerConnect
