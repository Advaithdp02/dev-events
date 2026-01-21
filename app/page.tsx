import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { time } from "console";
import {events} from "@/lib/constant";

const page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Events You Cant Miss
      </h1>
      <p className="text-center mt-5">
        Hackathon,Meetups, and Conferences All in one place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
