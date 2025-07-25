export interface Check {
  id: string;
  parameters: object;
  is_enabled?: boolean;
}

export interface HookOnFailObject {
  feedback?: HookFeedback;
}

export interface HookOnSuccessObject {
  feedback?: HookFeedback;
}

// Interface for Hook that will be contain a name for the hook and parameters for it which would be an object
// this can be extended for specific hook types later on
export interface HookObject {
  type: HookType;
  id: string;
  checks?: Check[];
  async?: boolean;
  onFail?: HookOnFailObject;
  onSuccess?: HookOnSuccessObject;
  deny?: boolean;
  eventType: 'beforeRequestHook' | 'afterRequestHook';
}

export interface HookSpanContextRequest {
  text: string;
  json: any;
  isStreamingRequest: boolean;
  isTransformed: boolean;
  headers: Record<string, string>;
}

export interface HookSpanContextResponse {
  text: string;
  json: any;
  statusCode: number | null;
  isTransformed: boolean;
}

// Interface for the context object that will be passed to the hooks
export interface HookSpanContext {
  request: HookSpanContextRequest;
  response: HookSpanContextResponse;
  provider: string;
  requestType: string;
  metadata?: Record<string, string>;
}

export interface GuardrailFeedbackMetadata {
  successfulChecks: string;
  failedChecks: string;
  erroredChecks: string;
}

export interface GuardrailFeedback {
  value?: number;
  weight?: number;
  metadata?: GuardrailFeedbackMetadata;
}

export type HookFeedback = GuardrailFeedback;

export interface GuardrailCheckResult {
  verdict: boolean;
  error?: Error | null;
  data?: any;
  id: string;
  transformed?: boolean;
  execution_time: number;
  created_at: Date;
  transformedData?: {
    request: {
      json: any;
    };
    response: {
      json: any;
    };
  };
  log?: any;
  fail_on_error?: boolean;
}

export interface GuardrailResult {
  verdict: boolean;
  id: string;
  checks: GuardrailCheckResult[];
  transformed?: boolean;
  feedback: GuardrailFeedback;
  error?: Error | null;
  async: boolean;
  deny: boolean;
  execution_time: number;
  skipped: boolean;
  type: HookType;
  created_at: Date;
}

// HookResult can be of type GuardrailResult or any other type of result
export type HookResult = GuardrailResult;

export type AllHookResults = {
  beforeRequestHooksResult: HookResult[];
  afterRequestHooksResult: HookResult[];
};

export type EventType = 'beforeRequestHook' | 'afterRequestHook';

export enum HookType {
  GUARDRAIL = 'guardrail',
  MUTATOR = 'mutator',
}

export interface HandlerOptions {
  env: Record<string, any>;
}
