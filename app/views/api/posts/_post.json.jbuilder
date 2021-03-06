json.extract! post, :id, :body, :poster_id, :wall_owner_id, :created_at
json.postPicUrl url_for(post.post_pic) if post.post_pic.attached?
json.poster do 
    user = post.poster 
    json.extract! user, :id, :first_name, :last_name
    json.profilePicUrl url_for(user.profile_pic) if user.profile_pic.attached?
end
json.comments do 
        post.comments.each do |comment|
            json.set! comment.id do
                json.partial! "api/comments/comment", comment: comment
            end
        end
end
json.likes do 
    post.likes.each do |like|
        json.set! like.id do 
            json.partial! "api/likes/like", like: like 
        end
    end
end
json.likers do 
    post.likes.each do |like| 
        user = like.liker 
        json.extract! user, :id, :first_name, :last_name 
    end
end

json.likerIds do 
    post.likes.each do |like| 
        user = like.liker 
        json.extract! user, :id
    end
end
    