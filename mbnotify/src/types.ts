export interface NotificationPayload {
  title?: string;
  body?: string;
  icon?: string;
  image?: string;
  url?: string;
  data?: Record<string, any>;
  timestamp?: number;
}

export interface SendNotificationOptions {
  appName: string;
  token: string;
  title?: string;
  body?: string;
  icon?: string;
  image?: string;
  url?: string;
  data?: Record<string, any>;
}

export interface SendNotificationResponse {
  success: boolean;
  topic: string;
}