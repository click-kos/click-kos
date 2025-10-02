export const getPeakHours = async (supabase: any) => {
  const { data: orders, error } = await supabase
    .from("order")
    .select("order_id, ordered_at");

  if (error) throw error;

  // Count per hour
  const hoursMap: Record<number, number> = {};
  for (let i = 0; i < 24; i++) hoursMap[i] = 0;

  orders.forEach((o: any) => {
    const hour = new Date(o.ordered_at).getHours(); // 0–23
    hoursMap[hour]++;
  });

  // Format hour into 12-hour format with AM/PM
  const formatHour = (hour: number): string => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${h12} ${suffix}`;
  };

  // Return only hours with orders > 0
  const data = Object.entries(hoursMap)
    .filter(([_, count]) => count > 0)
    .map(([hour, count]) => ({
      hour: formatHour(Number(hour)),
      orders: count,
    }));

  return data;
};


export const getOrders = async(supabase: any) => {

    const { data: orders, error } = await supabase.from("order").select("order_id,ordered_at, total_amount");

    if (error) throw error;
    return orders;
}

export const getTotalUsers = async(supabase: any) => {

  const {data: users, error} = await supabase.from("user").select("");
  if (error) throw error;

  return users.length;
}

