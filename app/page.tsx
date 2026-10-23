"use client";

import { useState } from "react";
import { findRoute, formatBudget, isLastDay, nextDay as nextDayIndex, routes, stopAt } from "@/lib/trip-atlas";

export default function Home() {
  const [routeId, setRouteId] = useState("north");
  const [day, setDay] = useState(0);
  const route = findRoute(routeId);
  const stop = stopAt(route, day);
  const nextDay = () => setDay((value) => nextDayIndex(route, value));

  return (
    <main className="atlas-page"><div className="atlas-shell">
      <header className="atlas-header"><div className="atlas-brand"><span className="atlas-mark">TA</span><span>TRIP / ATLAS</span></div><span>ROUTE PLANNING DESK</span><span className="atlas-status">STUDY DATA / 01</span></header>
      <section className="atlas-hero"><div><p className="atlas-kicker">route before reservation</p><h1>Leave room<br /><em>for the next stop.</em></h1><p className="atlas-deck">An itinerary desk for choosing a route, balancing a day, and keeping the cost visible before anything is booked.</p></div><div className="atlas-stamp"><span>SELECTED ROUTE</span><strong>{route.code}</strong><small>{route.nights}<br />synthetic plan</small></div></section>
      <section className="atlas-workspace"><aside className="route-index"><div className="section-label"><span>ROUTE INDEX</span><span>{routes.length} PLANS</span></div>{routes.map((item) => <button key={item.id} type="button" className={item.id === route.id ? "route-row is-active" : "route-row"} onClick={() => { setRouteId(item.id); setDay(0); }}><span>{item.code}</span><strong>{item.name}</strong><small>{item.mood}</small><b>{formatBudget(item.budget)}</b></button>)}</aside>
        <div className="route-sheet"><div className="sheet-head"><div><span>THE ROUTE / {route.code}</span><h2>{route.name}</h2><p>{route.mood}</p></div><strong>{formatBudget(route.budget)}</strong></div><div className="day-rail">{route.stops.map((item, index) => <button key={item.city} type="button" className={index === day ? "day-tab is-active" : "day-tab"} onClick={() => setDay(index)}><span>{item.time}</span><b>{item.city}</b></button>)}</div><div className="stop-note"><span>NOW READING / {stop.time}</span><h3>{stop.city}</h3><p>{stop.note}</p><button type="button" onClick={nextDay} disabled={isLastDay(route, day)}>{isLastDay(route, day) ? "Route complete" : "Mark next stop →"}</button></div></div>
      </section>
      <footer className="atlas-footer"><span>BOOKCHAOWALIT / TRIP ATLAS</span><span>ILLUSTRATIVE ROUTES · NOT LIVE TRAVEL DATA</span></footer>
    </div></main>
  );
}
