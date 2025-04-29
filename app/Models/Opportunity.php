<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Opportunity extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'value',
        'status',
    ];

    /**
     * relation: an opportunity belongs to a client.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);  // Cambiado de hasMany a belongsTo
    }

    /**
     * relation: an opportunity has many tasks.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
