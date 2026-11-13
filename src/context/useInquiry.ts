import { useContext } from 'react';
import { InquiryContext } from './InquiryContextInstance';
import type { InquiryContextType } from './InquiryContext';

const fallbackInquiryContext: InquiryContextType = {
  isInquiryOpen: false,
  openInquiry: () => {
    window.location.href = '/contact';
  },
  closeInquiry: () => {},
  contextTitle: undefined,
};

export const useInquiry = (): InquiryContextType => {
  const context = useContext(InquiryContext);
  if (!context) {
    return fallbackInquiryContext;
  }
  return context;
};
