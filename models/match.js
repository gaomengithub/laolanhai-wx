class Match {
  constructor({
    id,
    name,
    city,
    description,
    match_type,
    age_group_start,
    age_group_end,
    attachments,
    banner_attachments,
    arena_attachments,
    join_num,
    location,
    organizer,
    price,
    sports_halls,
    start_time,
    end_time,
    status
  }) {
    this.id = id,
      this.name = name,
      this.city = city,
      this.description = description,
      this.match_type = match_type,
      this.age_group_start = age_group_start,
      this.age_group_end = age_group_end,
      this.attachments = attachments,
      this.banner_attachments = banner_attachments,
      this.arena_attachments = arena_attachments,
      this.join_num = join_num,
      this.location = location,
      this.organizer = organizer,
      this.price = price,
      this.sports_halls = sports_halls,
      this.start_time = start_time,
      this.end_time = end_time,
      this.status = status
  }

}

export default Match