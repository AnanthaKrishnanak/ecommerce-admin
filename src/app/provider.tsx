import { Button, ConfigProvider, Result } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { paths } from '@/config/paths';

const queryClient = new QueryClient();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" href={paths.dashboard.getHref()}>
              Back Home
            </Button>
          }
        />
      )}
    >
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerPadding: 0,
            },
            Typography: {
              titleMarginTop: 0,
              titleMarginBottom: 0,
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
