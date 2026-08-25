import BoardList from "@/components/custom/dashboard/board-list"
import WelcomeBanner from "@/components/custom/dashboard/welcome-banner"


function Dashboard() {

        return (
                <div>
                        {/* Welcome banner */}
                         <WelcomeBanner />

                        {/* Board list / Empty State */}
                        <BoardList />
                </div>
        )
}

export default Dashboard