"use client";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { FilterBy } from "./components/FilterBy";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { getUserBudgets } from "@/lib/api/budget/budget";
import { useSession } from "next-auth/react";
import { Budget } from "@/types/budget";
import { BudgetCard } from "./components/BudgetCard";
import { useRouter } from "next/navigation";
import { BudgetSkeletonCard } from "@/components/common/skeletons/CardSkeleton";
import { SkeletonGrid } from "@/components/common";

function Home() {
  const [filter, setFilter] = useState({
    ownerBudgets: true,
    adminBudgets: true,
    memberBudgets: true,
  });
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const { data: sessionData } = useSession();

  const fetchBudgets = (id: string, params: any) => {
    setLoading(true);
    getUserBudgets(id, params).then((res) => {
      if (res) {
        setBudgets(res);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (sessionData) {
      fetchBudgets(sessionData.user.id, filter);
    }
  }, [filter])


  const filterBudgets = budgets.filter((bgt) => {
    return (
      bgt.title.toLowerCase().includes(search.toLowerCase()) ||
      bgt.description.toLowerCase().includes(search.toLowerCase()) ||
      search.trim() === ""
    );
  });


  return (
    <div >
      <div className="flex gap-6" >
        <SearchBar search={search} setSearch={setSearch} />
        <FilterBy filters={filter} setFilters={setFilter} />
        <Button onClick={() => {
          router.push("/create-budget");
        }} className="w-44 h-auto c-primary-btn" >
          <FaPlus />
          Add New
        </Button>
      </div>
      {
        loading ? <SkeletonGrid /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 flex-wrap pb-10" >

          {filterBudgets.map((bgt, index) => {
            return (
              <BudgetCard key={index} budget={bgt} onDelete={() => {
                sessionData?.user.id && fetchBudgets(sessionData.user.id, filter);
              }} />
            )
          })
          }
        </div>
      }
    </div>
  );
}

export default Home;



