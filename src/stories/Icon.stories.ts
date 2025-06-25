import type { Meta, StoryObj } from '@storybook/vue3';
import Icon from '../components/icons/Icon.vue';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Icon System

A flexible icon system with two usage methods:

## 1. Icon Registry (Recommended)
Use the \`Icon\` component with the \`name\` prop for easy and consistent access:
\`\`\`vue
<Icon name="home" :size="24" />
\`\`\`

## 2. Direct Import
Import icon components directly for more specific control:
\`\`\`vue
<HomeIcon :size="24" class="text-icon-black" />
\`\`\`

All icons support the following props:
- \`size\`: Icon size (default varies per icon)
- \`class\`: Additional CSS classes
- \`gradientStart\` & \`gradientEnd\`: Specific to WidgetIcon

Icons use \`currentColor\` so they can be styled with CSS color properties.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'home',
        'user',
        'setting',
        'search',
        'plus',
        'copy',
        'close',
        'broadcast',
        'arrow-down',
        'arrow-left',
        'chevron-left',
        'chevron-right',
        'double-chevron-left',
        'double-chevron-right',
        'chat',
      ],
      description: 'Icon name to display',
    },
    size: {
      control: { type: 'number', min: 12, max: 96, step: 4 },
      description: 'Icon size in pixels',
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
  },
};

// Size variations
export const Sizes: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-6">
        <div class="text-center">
          <Icon name="home" :size="8" />
          <p class="text-sm mt-2">8px</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="12" />
          <p class="text-sm mt-2">12px</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="16" />
          <p class="text-sm mt-2">16px</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" />
          <p class="text-sm mt-2">24px</p>
        </div>
      </div>
    `,
  }),
};

// Color variations
export const Colors: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-6">
        <div class="text-center">
          <Icon name="home" :size="24" class="text-icon-black" />
          <p class="text-sm mt-2">Black</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" class="text-icon-green" />
          <p class="text-sm mt-2">Green</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" class="text-icon-disable" />
          <p class="text-sm mt-2">Disable </p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="30" class="text-icon-white bg-slate-700 p-1 rounded-md" />
          <p class="text-sm mt-2">White</p>
        </div>
        
      </div>
    `,
  }),
};

// All available icons
export const AllIcons: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-7">
        <div class="text-center">
          <Icon name="inbox" :size="24" />
          <p class="text-xs mt-2">inbox</p>
        </div>
        <div class="text-center">
          <Icon name="broadcast" :size="24" />
          <p class="text-xs mt-2">broadcast</p>
        </div>
        <div class="text-center">
          <Icon name="customer" :size="24" />
          <p class="text-xs mt-2">customer</p>
        </div>
        <div class="text-center">
          <Icon name="analytics" :size="24" />
          <p class="text-xs mt-2">analytics</p>
        </div>
        <div class="text-center">
          <Icon name="integration" :size="24" />
          <p class="text-xs mt-2">integration</p>
        </div>
        <div class="text-center">
          <Icon name="app-center" :size="24" />
          <p class="text-xs mt-2">app-center</p>
        </div>
        <div class="text-center">
          <Icon name="robolabs" :size="24" />
          <p class="text-xs mt-2">robolabs</p>
        </div>
        <div class="text-center">
          <Icon name="ticketing" :size="24" />
          <p class="text-xs mt-2">ticketing</p>
        </div>
        <div class="text-center">
          <Icon name="qcrm" :size="24" />
          <p class="text-xs mt-2">qcrm</p>
        </div>
        <div class="text-center">
          <Icon name="workflow" :size="24" />
          <p class="text-xs mt-2">workflow</p>
        </div>
        <div class="text-center">
          <Icon name="mobile" :size="24" />
          <p class="text-xs mt-2">mobile</p>
        </div>
        <div class="text-center">
          <Icon name="setting" :size="24" />
          <p class="text-xs mt-2">setting</p>
        </div>
        <div class="text-center">
          <Icon name="help" :size="24" />
          <p class="text-xs mt-2">help</p>
        </div>
        <div class="text-center">
          <Icon name="logout" :size="24" />
          <p class="text-xs mt-2">logout</p>
        </div>
        <div class="text-center">
          <Icon name="filter-on" :size="24" />
          <p class="text-xs mt-2">filter-on</p>
        </div>
        <div class="text-center">
          <Icon name="chat-template" :size="24" />
          <p class="text-xs mt-2">chat-template</p>
        </div>
        <div class="text-center">
          <Icon name="notes" :size="24" />
          <p class="text-xs mt-2">notes</p>
        </div>
        <div class="text-center">
          <Icon name="credit-card" :size="24" />
          <p class="text-xs mt-2">credit-card</p>
        </div>
        <div class="text-center">
          <Icon name="user" :size="24" />
          <p class="text-xs mt-2">user</p>
        </div>
        <div class="text-center">
          <Icon name="predifined-message" :size="24" />
          <p class="text-xs mt-2">predifined-message</p>
        </div>
        <div class="text-center">
          <Icon name="hours" :size="24" />
          <p class="text-xs mt-2">hours</p>
        </div>
        <div class="text-center">
          <Icon name="tags" :size="24" />
          <p class="text-xs mt-2">tags</p>
        </div>
        <div class="text-center">
          <Icon name="bulk-resolved" :size="24" />
          <p class="text-xs mt-2">bulk-resolved</p>
        </div>
        <div class="text-center">
          <Icon name="send" :size="24" />
          <p class="text-xs mt-2">send</p>
        </div>
        <div class="text-center">
          <Icon name="customer-properties" :size="24" />
          <p class="text-xs mt-2">customer-properties</p>
        </div>
        <div class="text-center">
          <Icon name="notification" :size="24" />
          <p class="text-xs mt-2">notification</p>
        </div>
        <div class="text-center">
          <Icon name="search" :size="24" />
          <p class="text-xs mt-2">search</p>
        </div>
        <div class="text-center">
          <Icon name="subscription" :size="24" />
          <p class="text-xs mt-2">subscription</p>
        </div>
        <div class="text-center">
          <Icon name="merge" :size="24" />
          <p class="text-xs mt-2">merge</p>
        </div>
        <div class="text-center">
          <Icon name="eye" :size="24" />
          <p class="text-xs mt-2">eye</p>
        </div>
        <div class="text-center">
          <Icon name="custom-agent-allocation" :size="24" />
          <p class="text-xs mt-2">custom-agent-allocation</p>
        </div>
        <div class="text-center">
          <Icon name="template-message" :size="24" />
          <p class="text-xs mt-2">template-message</p>
        </div>
        <div class="text-center">
          <Icon name="submit-ticket" :size="24" />
          <p class="text-xs mt-2">submit-ticket</p>
        </div>
        <div class="text-center">
          <Icon name="whatsapp-business" :size="24" />
          <p class="text-xs mt-2">whatsapp-business</p>
        </div>
        <div class="text-center">
          <Icon name="general" :size="24" />
          <p class="text-xs mt-2">general</p>
        </div>
        <div class="text-center">
          <Icon name="agent-management" :size="24" />
          <p class="text-xs mt-2">agent-management</p>
        </div>
        <div class="text-center">
          <Icon name="api" :size="24" />
          <p class="text-xs mt-2">api</p>
        </div>
        <div class="text-center">
          <Icon name="copy" :size="24" />
          <p class="text-xs mt-2">copy</p>
        </div>
        <div class="text-center">
          <Icon name="information" :size="24" />
          <p class="text-xs mt-2">information</p>
        </div>
        <div class="text-center">
          <Icon name="more" :size="24" />
          <p class="text-xs mt-2">more</p>
        </div>
        <div class="text-center">
          <Icon name="plus" :size="24" />
          <p class="text-xs mt-2">plus</p>
        </div>
        <div class="text-center">
          <Icon name="filter" :size="24" />
          <p class="text-xs mt-2">filter</p>
        </div>
        <div class="text-center">
          <Icon name="edit" :size="24" />
          <p class="text-xs mt-2">edit</p>
        </div>
        <div class="text-center">
          <Icon name="refresh" :size="24" />
          <p class="text-xs mt-2">refresh</p>
        </div>
        <div class="text-center">
          <Icon name="puzzle" :size="24" />
          <p class="text-xs mt-2">puzzle</p>
        </div>
        <div class="text-center">
          <Icon name="success" :size="24" />
          <p class="text-xs mt-2">success</p>
        </div>
        <div class="text-center">
          <Icon name="error" :size="24" />
          <p class="text-xs mt-2">error</p>
        </div>
        <div class="text-center">
          <Icon name="attention" :size="24" />
          <p class="text-xs mt-2">attention</p>
        </div>
        <div class="text-center">
          <Icon name="warning" :size="24" />
          <p class="text-xs mt-2">warning</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-right" :size="24" />
          <p class="text-xs mt-2">chevron-right</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-left" :size="24" />
          <p class="text-xs mt-2">chevron-left</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-up" :size="24" />
          <p class="text-xs mt-2">chevron-up</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-down" :size="24" />
          <p class="text-xs mt-2">chevron-down</p>
        </div>
        <div class="text-center">
          <Icon name="next-pagination" :size="24" />
          <p class="text-xs mt-2">next-pagination</p>
        </div>
        <div class="text-center">
          <Icon name="back-pagination" :size="24" />
          <p class="text-xs mt-2">back-pagination</p>
        </div>
        <div class="text-center">
          <Icon name="close" :size="24" />
          <p class="text-xs mt-2">close</p>
        </div>
        <div class="text-center">
          <Icon name="back" :size="24" />
          <p class="text-xs mt-2">back</p>
        </div>
        <div class="text-center">
          <Icon name="next" :size="24" />
          <p class="text-xs mt-2">next</p>
        </div>
        <div class="text-center">
          <Icon name="shop" :size="24" />
          <p class="text-xs mt-2">shop</p>
        </div>
        <div class="text-center">
          <Icon name="chat" :size="24" />
          <p class="text-xs mt-2">chat</p>
        </div>
        <div class="text-center">
          <Icon name="minus" :size="24" />
          <p class="text-xs mt-2">minus</p>
        </div>
        <div class="text-center">
          <Icon name="check" :size="24" />
          <p class="text-xs mt-2">check</p>
        </div>
        <div class="text-center">
          <Icon name="additional-information" :size="24" />
          <p class="text-xs mt-2">additional-information</p>
        </div>
        <div class="text-center">
          <Icon name="date" :size="24" />
          <p class="text-xs mt-2">date</p>
        </div>
        <div class="text-center">
          <Icon name="reply" :size="24" />
          <p class="text-xs mt-2">reply</p>
        </div>
        <div class="text-center">
          <Icon name="currencies" :size="24" />
          <p class="text-xs mt-2">currencies</p>
        </div>
        <div class="text-center">
          <Icon name="coin-stack" :size="24" />
          <p class="text-xs mt-2">coin-stack</p>
        </div>
        <div class="text-center">
          <Icon name="file-search" :size="24" />
          <p class="text-xs mt-2">file-search</p>
        </div>
        <div class="text-center">
          <Icon name="clock-fast-forward" :size="24" />
          <p class="text-xs mt-2">clock-fast-forward</p>
        </div>
        <div class="text-center">
          <Icon name="line-chart" :size="24" />
          <p class="text-xs mt-2">line-chart</p>
        </div>
        <div class="text-center">
          <Icon name="login" :size="24" />
          <p class="text-xs mt-2">login</p>
        </div>
        <div class="text-center">
          <Icon name="identification" :size="24" />
          <p class="text-xs mt-2">identification</p>
        </div>
        <div class="text-center">
          <Icon name="window" :size="24" />
          <p class="text-xs mt-2">window</p>
        </div>
        <div class="text-center">
          <Icon name="package" :size="24" />
          <p class="text-xs mt-2">package</p>
        </div>
        <div class="text-center">
          <Icon name="newspaper" :size="24" />
          <p class="text-xs mt-2">newspaper</p>
        </div>
        <div class="text-center">
          <Icon name="megaphone" :size="24" />
          <p class="text-xs mt-2">megaphone</p>
        </div>
        <div class="text-center">
          <Icon name="edit-file" :size="24" />
          <p class="text-xs mt-2">edit-file</p>
        </div>
        <div class="text-center">
          <Icon name="presentation" :size="24" />
          <p class="text-xs mt-2">presentation</p>
        </div>
        <div class="text-center">
          <Icon name="user-3" :size="24" />
          <p class="text-xs mt-2">user-3</p>
        </div>
        <div class="text-center">
          <Icon name="clipboard" :size="24" />
          <p class="text-xs mt-2">clipboard</p>
        </div>
        <div class="text-center">
          <Icon name="delete" :size="24" />
          <p class="text-xs mt-2">delete</p>
        </div>
        <div class="text-center">
          <Icon name="open-tab" :size="24" />
          <p class="text-xs mt-2">open-tab</p>
        </div>
        <div class="text-center">
          <Icon name="trending" :size="24" />
          <p class="text-xs mt-2">trending</p>
        </div>
        <div class="text-center">
          <Icon name="square" :size="24" />
          <p class="text-xs mt-2">square</p>
        </div>
        <div class="text-center">
          <Icon name="user-circle" :size="24" />
          <p class="text-xs mt-2">user-circle</p>
        </div>
        <div class="text-center">
          <Icon name="omnichannel" :size="24" />
          <p class="text-xs mt-2">omnichannel</p>
        </div>


        <!-- Common icons -->
        <div class="text-center">
          <Icon name="home" :size="24" />
          <p class="text-xs mt-2">home</p>
        </div>
        <div class="text-center">
          <Icon name="double-chevron-left" :size="24" />
          <p class="text-xs mt-2">double-chevron-left</p>
        </div>
        <div class="text-center">
          <Icon name="double-chevron-right" :size="24" />
          <p class="text-xs mt-2">double-chevron-right</p>
        </div>
        <div class="text-center">
          <Icon name="qiscus" :size="24" />
          <p class="text-xs mt-2">qiscus</p>
        </div>
      </div>
    `,
  }),
};

// Individual icon stories for better documentation
export const HomeIcon: Story = {
  args: {
    name: 'home',
    size: 32,
  },
};

export const InboxIcon: Story = {
  args: {
    name: 'inbox',
    size: 32,
  },
};

export const BroadcastIcon: Story = {
  args: {
    name: 'broadcast',
    size: 32,
  },
};

export const CustomerIcon: Story = {
  args: {
    name: 'customer',
    size: 32,
  },
};

export const AnalyticsIcon: Story = {
  args: {
    name: 'analytics',
    size: 32,
  },
};

export const IntegrationIcon: Story = {
  args: {
    name: 'integration',
    size: 32,
  },
};

export const SettingIcon: Story = {
  args: {
    name: 'setting',
    size: 32,
  },
};

export const UserIcon: Story = {
  args: {
    name: 'user',
    size: 32,
  },
};

export const SearchIcon: Story = {
  args: {
    name: 'search',
    size: 32,
  },
};

export const PlusIcon: Story = {
  args: {
    name: 'plus',
    size: 32,
  },
};

export const CopyIcon: Story = {
  args: {
    name: 'copy',
    size: 32,
  },
};

export const EditIcon: Story = {
  args: {
    name: 'edit',
    size: 32,
  },
};

export const DeleteIcon: Story = {
  args: {
    name: 'delete',
    size: 32,
  },
};

export const CloseIcon: Story = {
  args: {
    name: 'close',
    size: 32,
  },
};

export const FilterIcon: Story = {
  args: {
    name: 'filter',
    size: 32,
  },
};

export const RefreshIcon: Story = {
  args: {
    name: 'refresh',
    size: 32,
  },
};

export const SuccessIcon: Story = {
  args: {
    name: 'success',
    size: 32,
  },
};

export const ErrorIcon: Story = {
  args: {
    name: 'error',
    size: 32,
  },
};

export const WarningIcon: Story = {
  args: {
    name: 'warning',
    size: 32,
  },
};

export const AttentionIcon: Story = {
  args: {
    name: 'attention',
    size: 32,
  },
};

export const ChevronLeftIcon: Story = {
  args: {
    name: 'chevron-left',
    size: 32,
  },
};

export const ChevronRightIcon: Story = {
  args: {
    name: 'chevron-right',
    size: 32,
  },
};

export const ChevronUpIcon: Story = {
  args: {
    name: 'chevron-up',
    size: 32,
  },
};

export const ChevronDownIcon: Story = {
  args: {
    name: 'chevron-down',
    size: 32,
  },
};

export const DoubleChevronLeftIcon: Story = {
  args: {
    name: 'double-chevron-left',
    size: 32,
  },
};

export const DoubleChevronRightIcon: Story = {
  args: {
    name: 'double-chevron-right',
    size: 32,
  },
};

export const BackIcon: Story = {
  args: {
    name: 'back',
    size: 32,
  },
};

export const NextIcon: Story = {
  args: {
    name: 'next',
    size: 32,
  },
};

export const CheckIcon: Story = {
  args: {
    name: 'check',
    size: 32,
  },
};

export const MinusIcon: Story = {
  args: {
    name: 'minus',
    size: 32,
  },
};

export const MoreIcon: Story = {
  args: {
    name: 'more',
    size: 32,
  },
};

export const InformationIcon: Story = {
  args: {
    name: 'information',
    size: 32,
  },
};

export const HelpIcon: Story = {
  args: {
    name: 'help',
    size: 32,
  },
};

export const EyeIcon: Story = {
  args: {
    name: 'eye',
    size: 32,
  },
};

export const SendIcon: Story = {
  args: {
    name: 'send',
    size: 32,
  },
};

export const ChatIcon: Story = {
  args: {
    name: 'chat',
    size: 32,
  },
};

export const LogoutIcon: Story = {
  args: {
    name: 'logout',
    size: 32,
  },
};

export const NotificationIcon: Story = {
  args: {
    name: 'notification',
    size: 32,
  },
};

export const TagsIcon: Story = {
  args: {
    name: 'tags',
    size: 32,
  },
};

export const SquareIcon: Story = {
  args: {
    name: 'square',
    size: 32,
  },
};

export const UserCircleIcon: Story = {
  args: {
    name: 'user-circle',
    size: 32,
  },
};

export const ClipboardIcon: Story = {
  args: {
    name: 'clipboard',
    size: 32,
  },
};

export const TrendingIcon: Story = {
  args: {
    name: 'trending',
    size: 32,
  },
};

export const OmnichannelIcon: Story = {
  args: {
    name: 'omnichannel',
    size: 32,
  },
};

// Error handling
export const IconNotFound: Story = {
  args: {
    name: 'non-existent-icon',
    size: 32,
  },
};
