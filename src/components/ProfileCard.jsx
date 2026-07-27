import { PersonIcon, PhoneIcon, MoonIcon } from "./icons.jsx";

export default function ProfileCard({ name, username, platform, theme }) {

  return (
    <div className="profile-card">

      <div className="avatar">
        <PersonIcon width={34} height={34} />
      </div>

      <h2 className="profile-name">{name}</h2>
      <p className="profile-username">@{username}</p>

      <div className="badge-row">

        <span className="badge">
          <PhoneIcon width={15} height={15} />
          {platform}
        </span>

        <span className="badge">
          <MoonIcon width={15} height={15} />
          {theme}
        </span>

      </div>

    </div>
  );

}
