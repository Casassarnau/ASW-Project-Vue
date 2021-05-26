
export default{
    list_comments(list, level) { 
        let list_new = [];
                    
        for (let item in list) {
            item['level'] = level;
            let aux = this.list_comments(item.comments, level+15);
            item.delete('comments');  
            list_new.push(item);
            list_new.concat(aux);              
        } 
        
        return list_new;
    }
}
