import React from 'react'
import {SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/custom/dashboard/app-sidebar'
import AppHeader from '@/components/custom/dashboard/app-header'

function ArchivedLayout({children}:{children:React.ReactNode}) {
        return (
                 <SidebarProvider>
                        
                        <AppSidebar />
                        <div className="flex flex-1 flex-col">
                                <AppHeader />
                               <div className='p-4'>
                                 {children}
                               </div>
                        </div>
                 </SidebarProvider>
        )
}

export default ArchivedLayout