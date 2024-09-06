import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { ChevronDownIcon, Loader } from "lucide-react";
import {
  type BatchExportTableName,
  exportOptions,
  type BatchExportFileFormat,
  type OrderByState,
} from "@langfuse/shared";
import React from "react";
import { api } from "@/src/utils/api";
import { showSuccessToast } from "@/src/features/notifications/showSuccessToast";
import { useHasProjectAccess } from "@/src/features/rbac/utils/checkProjectAccess";
import { useHasOrgEntitlement } from "@/src/features/entitlements/hooks";

export type BatchExportTableButtonProps = {
  projectId: string;
  tableName: BatchExportTableName;
  orderByState: OrderByState;
  filterState: any;
  searchQuery?: any;
};

export const BatchExportTableButton: React.FC<BatchExportTableButtonProps> = (
  props,
) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const createExport = api.batchExport.create.useMutation();
  const entitled = useHasOrgEntitlement("batch-export");
  const hasAccess = useHasProjectAccess({
    projectId: props.projectId,
    scope: "batchExport:create",
  });

  const handleExport = async (format: BatchExportFileFormat) => {
    setIsExporting(true);
    await createExport.mutateAsync({
      projectId: props.projectId,
      name: `${new Date().toISOString()} - ${props.tableName} as ${format}`,
      format,
      query: {
        tableName: props.tableName,
        filter: props.filterState,
        orderBy: props.orderByState,
      },
    });
    setIsExporting(false);
    showSuccessToast({
      title: "추출 요청됨",
      description: "추출이 완료되면 이메일로 전달해드립니다.",
    });
  };

  if (!entitled || !hasAccess) return null;

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" className="ml-auto whitespace-nowrap">
    //       <span className="hidden @6xl:inline">
    //         {props.filterState.length > 0 || props.searchQuery
    //           ? "추출 방법 선택"
    //           : "전체 추출"}{" "}
    //       </span>
    //       <span className="@6xl:hidden">Export</span>
    //       {isExporting ? (
    //         <Loader className="ml-2 h-4 w-4 animate-spin" />
    //       ) : (
    //         <ChevronDownIcon className="ml-2 h-4 w-4" />
    //       )}
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     {Object.entries(exportOptions).map(([key, options]) => (
    //       <DropdownMenuItem
    //         key={key}
    //         className="capitalize"
    //         onClick={() => void handleExport(key as BatchExportFileFormat)}
    //       >
    //         as {options.label}
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
    ""
  );
};
