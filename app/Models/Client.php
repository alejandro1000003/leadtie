<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // Table name (optional, defaults to the plural of the class name)
    // protected $table = 'clients';

    // Primary key (optional, defaults to 'id')
    // protected $primaryKey = 'client_id';

    // Indicates if the model should be timestamped (created_at and updated_at)
    public $timestamps = true;

    // The attributes that are mass assignable.
    protected $fillable = [
        'first_name', 'last_name', 'email', 'phone', 'address', 'company_name'
    ];
    
    // The attributes that should be hidden for arrays.
    protected $hidden = [];

    // The attributes that should be cast to native types.
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // relation: a client has many opportunities
    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }
}
