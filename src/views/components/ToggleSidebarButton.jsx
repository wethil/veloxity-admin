import React from 'react';
import { Button } from 'reactstrap';
import { ChevronRight, ChevronLeft } from 'react-feather';

export default function SidebarToggleButton({ isSidebarCollapsed, toggleSidebar }) {
  const ChevronIcon = isSidebarCollapsed ? ChevronRight : ChevronLeft;
  const screenReaderLabel = isSidebarCollapsed ? 'Expand Sidebar Navigation' : 'Collapse Sidebar Navigation';
  return (
    <Button onClick={toggleSidebar} className={'m-r sidebar-toggle'} aria-label={screenReaderLabel}>
      <ChevronIcon />
    </Button>
  );
}
