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
import { SkeletonGrid } from "@/components/common";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Home() {
  const [filter, setFilter] = useState({
    ownerBudgets: true,
    adminBudgets: true,
    memberBudgets: true,
  });
  const INCR_SIZE = 6;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [total, setCount] = useState(0);
  const [showCount, setShowCount] = useState(INCR_SIZE);
  const { data: sessionData } = useSession();

  const fetchBudgets = (id: string, params: any) => {
    setLoading(true);
    getUserBudgets(id, params).then((res) => {
      if (res) {
        setBudgets(res?.budgets);
        setCount(res?.aggregates?.count);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (sessionData) {
      fetchBudgets(sessionData.user.id, { limit: showCount, ...filter });
    }
  }, [filter, showCount]);

  const handleSeeMore = () => {
    if (showCount < total) {
      setShowCount(showCount + INCR_SIZE);
    } else {
      setShowCount(INCR_SIZE);
    }
  }


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
        loading ? <SkeletonGrid /> :
          <div className="flex flex-col items-center pb-2 gap-4" >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full" >
              {filterBudgets.map((bgt, index) => {
                return (
                  <BudgetCard key={index} budget={bgt} onDelete={() => {
                    sessionData?.user.id && fetchBudgets(sessionData.user.id, filter);
                  }} />
                )
              })
              }
            </div>
            <Button className="text-white w-min gap-1" onClick={handleSeeMore}>{showCount < total ? <><IoIosArrowDown /> View More</> : <><IoIosArrowUp /> View Less</>}</Button>
          </div>
      }
    </div>
  );
}

export default Home;



